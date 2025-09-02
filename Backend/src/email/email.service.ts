import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private bgImageData: string | undefined; // data URI for background

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Preload and inline the background image as base64 so it renders inside email clients
    try {
      const possiblePaths = [
        path.resolve(process.cwd(), 'Backend/src/images/bg_pc.png'),
        path.resolve(process.cwd(), 'src/images/bg_pc.png'),
        path.resolve(__dirname, '../images/bg_pc.png'),
      ];
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          const img = fs.readFileSync(p);
            this.bgImageData = `data:image/png;base64,${img.toString('base64')}`;
          break;
        }
      }
    } catch (e) {
      // Non-fatal; we just skip the background if unavailable
      console.warn('Could not load background image for emails', e);
    }
  }

  /**
   * Wrap raw inner HTML content with a cyberpunk / gaming themed template.
   * Keeps inline styles for maximum client compatibility.
   */
  private wrapTemplate(innerHtml: string, heading?: string): string {
    const bg = this.bgImageData || '#0d0020';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>${heading || 'Semaphore 2k25'}</title>
<style>
  /* Some clients (Gmail web) strip head styles; critical styles are inline below */
  @media (prefers-color-scheme: dark) { body { background:#050011 !important; } }
</style>
</head>
<body style="margin:0;padding:0;background:#050011;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#050011 url('${bg}') center/cover no-repeat;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:rgba(5,0,25,0.72);backdrop-filter:blur(4px);border:1px solid #2a1455;border-radius:20px;box-shadow:0 0 25px rgba(138,43,226,0.55),0 0 60px rgba(0,255,255,0.15);overflow:hidden;">
          <tr>
            <td style="padding:32px 36px;color:#ffffff;">
              <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#00eaff;font-weight:600;margin:0 0 14px;">Semaphore 2k25</div>
              ${heading ? `<h1 style="margin:0 0 22px;font-size:28px;line-height:1.15;font-weight:700;background:linear-gradient(90deg,#ff00ff,#00eaff,#8a2be2);-webkit-background-clip:text;color:transparent;">${heading}</h1>` : ''}
              <div style="font-size:15px;line-height:1.65;color:#f2f6ff;">
                ${innerHtml}
              </div>
              <hr style="border:none;height:1px;background:linear-gradient(90deg,transparent,#ff00ff,#00eaff,#ff00ff,transparent);margin:32px 0 18px;" />
              <p style="margin:0;font-size:11px;line-height:1.5;color:#8b92b0;">If you didn't expect this email you can safely ignore it. © Semaphore 2k25</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body></html>`;
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendEmailVerificationMail(
    toEmailId: string,
    fullName: string,
    userId: string,
  ): Promise<void> {
    const subject: string = '🔐 Verify Your Email – Enter the Grid (Semaphore 2k25)';
    const verificationLink: string = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/verify-email?userId=${userId}`;
    const inner = `<p style='margin:0 0 16px;'>Hey <strong>${fullName}</strong>,</p>
    <p style='margin:0 0 16px;'>You are moments away from jacking into <strong>Semaphore 2k25</strong> at <strong>NMAMIT, Nitte</strong>. We just need to verify this address is really you.</p>
    <p style='margin:24px 0 28px;text-align:center;'>
      <a href='${verificationLink}' style='display:inline-block;background:linear-gradient(135deg,#ff00ff,#00eaff);color:#0d0020 !important;text-decoration:none;font-weight:700;padding:14px 30px;border-radius:10px;font-size:15px;letter-spacing:.5px;box-shadow:0 0 12px rgba(255,0,255,.6),0 0 20px rgba(0,234,255,.45);'>VERIFY EMAIL ACCESS</a>
    </p>
    <p style='margin:0 0 18px;font-size:14px;color:#b7c2de;'>If the neon button glitches, jump through this link instead:<br><span style='word-break:break-all;color:#00eaff;'>${verificationLink}</span></p>
    <h3 style='margin:30px 0 12px;font-size:17px;color:#ff70ff;'>Event Briefing</h3>
    <ul style='padding:0 0 0 18px;margin:0 0 20px;'>
      <li style='margin:4px 0;'>📅 9 & 10 Oct 2025</li>
      <li style='margin:4px 0;'>📍 NMAMIT Campus, Nitte, Karkala</li>
      <li style='margin:4px 0;'>⏰ 09:00 – 18:00 IST</li>
    </ul>
    <h3 style='margin:0 0 12px;font-size:17px;color:#00eaff;'>Next Steps</h3>
    <ol style='margin:0 0 24px;padding:0 0 0 18px;'>
      <li>Verify your email (this step).</li>
      <li>Log in with your credentials.</li>
      <li>Open Registration & add participant details.</li>
      <li>Scan the QR, submit payment meta (Account Holder, Phone, UPI ID, Txn ID).</li>
      <li>Wait for payment validation → Confirmation mail arrives.</li>
    </ol>
    <p style='margin:0 0 14px;'><strong>Note:</strong> Team slot locks only after successful payment verification.</p>
    <p style='margin:28px 0 0;'>See you on the grid,<br><span style='color:#00eaff;font-weight:600;'>Semaphore Ops Team</span></p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Verify your email to finalize your Semaphore 2k25 registration: ${verificationLink}`,
      html: this.wrapTemplate(inner, 'Email Verification'),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendPaymentAcceptedEmail(
    toEmailId: string,
    fullName: string,
  ): Promise<void> {
    const subject = `✅ Registration Locked In – See You at Semaphore 2k25`;
    const inner = `<p>Hey <strong>${fullName}</strong>,</p>
    <p>Your payment has <span style='color:#00eaff;'>cleared the system</span>. Your slot is now <strong style='color:#ff70ff;'>officially confirmed</strong> for <strong>Semaphore 2k25</strong>.</p>
    <h3 style='margin:26px 0 12px;font-size:17px;color:#ff70ff;'>Event Coordinates</h3>
    <ul style='padding:0 0 0 18px;margin:0 0 18px;'>
      <li>📅 9 & 10 Oct 2025</li>
      <li>📍 NMAMIT Campus, Nitte, Karkala</li>
      <li>⏰ 09:00 – 18:00 IST</li>
    </ul>
    <p>Prep your rig, sharpen your logic, and get ready for high‑impact rounds.</p>
    <p style='margin:30px 0 0;'>Welcome aboard,<br><span style='color:#00eaff;'>Semaphore 2k25 Crew</span></p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
  text: `Your Semaphore 2k25 registration is confirmed. Event: 9 & 10 Oct 2025 @ NMAMIT.`,
      html: this.wrapTemplate(inner, 'Registration Confirmed'),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendPaymentRejectedEmail(
    toEmailId: string,
    fullName: string,
    remarks: string,
  ): Promise<void> {
    const subject = `⚠ Payment Issue – Action Needed (Semaphore 2k25)`;
    const inner = `<p>Hi <strong>${fullName}</strong>,</p>
    <p>Your payment attempt for <strong>Semaphore 2k25</strong> didn't pass validation.</p>
    <p style='margin:0 0 18px;'><strong style='color:#ff70ff;'>Reason:</strong> <span style='color:#00eaff;'>${remarks}</span></p>
    <h3 style='margin:24px 0 10px;font-size:17px;color:#ff70ff;'>How to Fix</h3>
    <ol style='margin:0 0 22px;padding:0 0 0 18px;'>
      <li>Re-check transaction details (UPI ID, Txn ID, amount).</li>
      <li>Ensure the payment was successful in your banking app.</li>
      <li>Re‑submit with correct metadata.</li>
    </ol>
    <h3 style='margin:0 0 12px;font-size:17px;color:#00eaff;'>Event Snapshot</h3>
    <ul style='padding:0 0 0 18px;margin:0 0 20px;'>
      <li>📅 9 & 10 Oct 2025</li>
      <li>📍 NMAMIT Campus, Nitte</li>
      <li>⏰ 09:00 – 18:00 IST</li>
    </ul>
    <p>Reply to this mail if you need manual assistance.</p>
    <p style='margin:26px 0 0;'>We want you in the arena,<br><span style='color:#00eaff;'>Semaphore Support</span></p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
  text: `Payment issue for Semaphore 2k25 (Event: 9 & 10 Oct 2025). Reason: ${remarks}. Please retry with correct details.`,
      html: this.wrapTemplate(inner, 'Payment Rejected'),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendNextRoundSelectedEmail(
    toEmailId: string,
    fullName: string,
    eventName: string,
    roundNo: number,
  ): Promise<void> {
    const subject = `🚀 Advanced to Round ${roundNo} – ${eventName}`;
    const inner = `<p>Hey <strong>${fullName}</strong>,</p>
    <p>Your team just <span style='color:#00eaff;'>leveled up</span> to <strong>Round ${roundNo}</strong> of <strong>${eventName}</strong> at <strong>Semaphore 2k25</strong>.</p>
    <p>Stay sharp – the difficulty curve spikes from here. Optimize, adapt, dominate.</p>
    <p style='margin:28px 0 0;'>Onward,<br><span style='color:#ff70ff;'>Event Core Team</span></p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Selected for Round ${roundNo} of ${eventName} at Semaphore 2k25. Keep going!`,
      html: this.wrapTemplate(inner, `Advanced to Round ${roundNo}`),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendPasswordResetLinkEmail(
    toEmail: string,
    name: string,
    userId: string,
  ): Promise<void> {
    const resetLink = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/change-password?userId=${userId}`;
    const inner = `<p>Hi <strong>${name}</strong>,</p>
    <p>A password reset signal was received for your <strong>Semaphore 2k25</strong> account. If this wasn't you, disregard and your credentials stay intact.</p>
    <p style='text-align:center;margin:30px 0;'>
      <a href='${resetLink}' style='display:inline-block;background:linear-gradient(135deg,#ff00ff,#00eaff);color:#0d0020 !important;text-decoration:none;font-weight:700;padding:14px 34px;border-radius:12px;font-size:15px;letter-spacing:.5px;box-shadow:0 0 14px rgba(255,0,255,.55),0 0 28px rgba(0,234,255,.35);'>RESET PASSWORD</a>
    </p>
    <p style='margin:0 0 18px;font-size:13px;color:#b7c2de;'>Alt link (copy + paste):<br><span style='word-break:break-all;color:#00eaff;'>${resetLink}</span></p>
    <p><strong>Expires:</strong> 24 hours from request.</p>
    <p style='margin:30px 0 0;'>Stay secure,<br><span style='color:#00eaff;'>Semaphore Security Bot</span></p>`;
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmail,
      subject: 'Password Reset Link – Semaphore 2k25',
      text: `Reset your Semaphore 2k25 password: ${resetLink}`,
      html: this.wrapTemplate(inner, 'Password Reset'),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }
}
