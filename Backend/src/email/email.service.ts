import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    // Gmail app passwords are often displayed with spaces for readability. Remove them.
    const rawPass = this.configService.get<string>('GMAIL_PASS');
    const cleanedPass = rawPass?.replace(/\s+/g, '').replace(/^"|"$/g, '');

    // Use explicit SMTP configuration + pooling for faster subsequent sends
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: this.configService.get<string>('GMAIL_HOST') || 'smtp.gmail.com',
      port: Number(this.configService.get<string>('GMAIL_PORT')) || 465,
      secure: true, // 465 uses implicit TLS
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: cleanedPass,
      },
      // Basic rate limiting to avoid Gmail throttling under bursts
      maxConnections: Number(this.configService.get('EMAIL_MAX_CONNECTIONS')) || 3,
      maxMessages: Number(this.configService.get('EMAIL_MAX_MESSAGES')) || 100,
      // TLS options (leave verification on for security; can be toggled via env if needed)
      tls: {
        rejectUnauthorized: (this.configService.get<string>('EMAIL_STRICT_TLS') ?? 'true') === 'true',
      },
    });

    // Proactive verification (non-blocking) so first real email isn't delayed by handshake
    this.transporter.verify().then(() => {
      this.logger.log('Email transporter verified successfully.');
    }).catch(err => {
      this.logger.warn(`Email transporter verification failed: ${err?.message}`);
    });
  }

  private async sendWithTiming(options: nodemailer.SendMailOptions): Promise<void> {
    const start = Date.now();
    try {
      const info = await this.transporter.sendMail({
        priority: 'high',
        ...options,
        from: options.from || `Semaphore 2k25 <${this.configService.get<string>('GMAIL_USER')}>`,
      });
      const duration = Date.now() - start;
      this.logger.debug(`Email to ${options.to} accepted by SMTP in ${duration}ms (messageId=${info.messageId}).`);
      if (duration > 5000) {
        this.logger.warn(`Slow email send detected (${duration}ms). Consider switching to a transactional provider (SES/Mailgun/Resend).`);
      }
    } catch (error: any) {
      const duration = Date.now() - start;
      this.logger.error(`Failed to send email to ${options.to} after ${duration}ms: ${error?.message}`);
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    await this.sendWithTiming({ to, subject, text, html });
  }

  async sendEmailVerificationMail(
    toEmailId: string,
    fullName: string,
    userId: string,
  ): Promise<void> {
    const subject: string =
      '🔐 Please Verify Your Email for Semaphore 2k25 Registration';
    const verificationLink: string = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/verify-email?userId=${userId}`;
    const htmlContent: string = `<h1>Hello ${fullName},</h1> <p>Thank you for showing interest in <strong>Semaphore 2k25</strong> at <strong>NMAMIT, Nitte</strong>!</p> <p>Please confirm your email address by clicking the link below:</p><p><a href="${verificationLink}">Verify Email Address</a></p><p>If you did not register for this event, please ignore this email.</p><h4>Event Details:</h4><p>📅 Event Date: 9th & 10th Oct, 2025</p><p>📍 Location: NMAMIT Campus, Nitte, Karkala</p><p>⏰ Time: 9.00 AM IST to 6.00 PM IST</p><h4>Steps for Registration:</h4><ol><li>Verify your email using the link provided.</li><li>Log in to the website using your email and password.</li><li>Once logged in, go to the Registration Menu and enter the name and phone number of the participants.</li><li>Proceed to the payment step, scan the QR code, and provide payment details including Account Holder Name, Phone Number, UPI ID, and Transaction ID. Confirm the details.</li>
    <li>After the payment is verified, a confirmation email will be sent to this email.</li></ol><p><strong>Note:</strong> Registration of the team is completed only after the payment is received successfully.</p><p>With warm regards,<br>The Semaphore Team<br>Semaphore 2k25</p>`;

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Thank you for registering! Please verify your email by clicking the link below:`,
      html: htmlContent,
    };

    await this.sendWithTiming(mailOptions);
  }

  async sendPaymentAcceptedEmail(
    toEmailId: string,
    fullName: string,
  ): Promise<void> {
    const subject = `Your Registration for Semaphore 2k25 is Confirmed!`;
    const htmlContent = `<h1>Hello ${fullName},</h1> <p>Congratulations! We have successfully received your payment for <strong>Semaphore 2k25</strong> at <strong>NMAMIT, Nitte</strong> and your application is now confirmed.</p><p>We’re thrilled to welcome you to this exciting event. <h4>Event Details:</h4><p>📅 <strong>Event Date:</strong> 9th & 10th Oct, 2025</p><p>📍 <strong>Location:</strong> NMAMIT Campus, Nitte, Karkala</p><p>⏰ <strong>Time:</strong> 9:00 AM IST to 6:00 PM IST</p><p>If you have any questions or require further assistance, feel free to reply to this email.</p><p>Thank you once again for registering, and we look forward to seeing you at <strong>Semaphore 2k25</strong>!</p><p>Warm regards,</p><p><strong>The Semaphore 2k25 Team</strong><br>NMAMIT, Nitte</p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Congratulations! We have successfully received your payment for Semaphore 2k25  at NMAMIT, Nitte  and your application is now confirmed. We’re thrilled to welcome you to this exciting event.`,
      html: htmlContent,
    };

    await this.sendWithTiming(mailOptions);
  }

  async sendPaymentRejectedEmail(
    toEmailId: string,
    fullName: string,
    remarks: string,
  ): Promise<void> {
    const subject = `Action Required: Payment Issue for Semaphore 2k25 Registration`;
    const htmlContent = `<h1>Hello ${fullName},</h1> <p>We regret to inform you that there was an issue with the payment for <strong>Semaphore 2k25</strong> at <strong>NMAMIT, Nitte</strong>, and your registration could not be confirmed at this time.</p><p><strong>Reason for Rejection:</strong> ${remarks}</p><p>Please review the payment details and make a new payment to complete your registration. We would love to see you at Semaphore 2k25 and don’t want you to miss out on the exciting sessions, activities, and networking opportunities!</p><h4>Event Details:</h4><p>📅 <strong>Event Date:</strong> 9th & 10th Oct, 2025</p><p>📍 <strong>Location:</strong> NMAMIT Campus, Nitte, Karkala</p><p>⏰ <strong>Time:</strong> 9:00 AM IST to 6:00 PM IST</p><h4>To Complete Your Registration:</h4><ol><li>Verify your payment information.</li><li>Submit a new payment with accurate details.</li><li>Ensure all necessary details, including UPI ID and Transaction ID, are correct.</li></ol><p>If you have any questions or require further assistance, please feel free to reply to this email.</p><p>Thank you for your interest in <strong>Semaphore 2k25</strong>, and we look forward to your successful registration.</p><p>Warm regards,</p><p><strong>The Semaphore 2k25 Team</strong><br>NMAMIT, Nitte</p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `We regret to inform you that there was an issue with the payment for Semaphore 2k25  at NMAMIT, Nitte, and your registration could not be confirmed at this time. Please review the payment details and make a new payment to complete your registration. We would love to see you at Semaphore 2k25 and don’t want you to miss out on the exciting sessions, activities, and networking opportunities!`,
      html: htmlContent,
    };

    await this.sendWithTiming(mailOptions);
  }

  async sendNextRoundSelectedEmail(
    toEmailId: string,
    fullName: string,
    eventName: string,
    roundNo: number,
  ): Promise<void> {
    const subject = `🎉 Congratulations! You have been selected for the Round ${roundNo} of ${eventName}`;
    const body = `<h1>Hello ${fullName},</h1><p>Congratulations! Your team has been promoted to the next round of <strong>${eventName}</strong> at <strong>Semaphore 2k25</strong>!</p><p>We're thrilled to see your team's progress and wish you the best for the upcoming challenges. </p><p> Good luck!</p><p>With warm regards,<br>The Semaphore Team<br>Semaphore 2k25</p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Hello ${fullName},Congratulations! Your team has been promoted to the next round of ${eventName} at Semaphore 2k25! We're thrilled to see your team's progress and wish you the best for the upcoming challenges. Good luck! With warm regards, The Semaphore Team Semaphore 2k25`,
      html: body,
    };

    await this.sendWithTiming(mailOptions);
  }

  async sendPasswordResetLinkEmail(
    toEmail: string,
    name: string,
    userId: string,
  ): Promise<void> {
  const resetLink = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/change-password?userId=${userId}`;
    const body = `<h1>Hello ${name},</h1><p>We received a request to reset your password for your account at <strong>Semaphore 2k25</strong>. If you did not request this change, you can safely ignore this email.</p><p>To reset your password, click the link below:</p><p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p><p>If the button above does not work, copy and paste the following URL into your web browser:</p<p>${resetLink}</p><p><strong>Note:</strong> This password reset link is valid for 24 hours. After that, you will need to request a new link.</p><p>If you have any questions or need further assistance, feel free to contact us.</p><p>With warm regards,<br>The Semaphore 2k25 Team</p>`;

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmail,
      subject: 'Link To Reset Password for Semaphore 2k25',
      text: `Reset Password: ${resetLink}`,
      html: body,
    };

    await this.sendWithTiming(mailOptions);
  }

  // New, dedicated template for Forgot Password flow (do not modify existing one above)
  async sendForgotPasswordEmail(
    toEmail: string,
    name: string,
    userId: string,
  ): Promise<void> {
    const resetLink = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/new-password?userId=${userId}`;
    const subject = 'Reset Your Semaphore 2k25 Password';
    const html = `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h1 style="color:#111;">Password Reset Requested</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password for your <strong>Semaphore 2k25</strong> account.</p>
        <p style="margin:24px 0;">
          <a href="${resetLink}" style="background:#6D28D9;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block">Set New Password</a>
        </p>
        <p>If the button doesn’t work, copy and paste this URL into your browser:</p>
        <p style="word-break:break-all;">${resetLink}</p>
        <p style="color:#555;font-size:14px;">This link is valid for 24 hours. If you didn’t request this, you can ignore this email.</p>
        <p>— The Semaphore 2k25 Team</p>
      </div>
    `;

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmail,
      subject,
      text: `Use the link to set a new password: ${resetLink}`,
      html,
    };

    await this.sendWithTiming(mailOptions);
  }
}