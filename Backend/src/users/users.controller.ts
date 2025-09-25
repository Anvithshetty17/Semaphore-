import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Controller('/web/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/CreateUser')
  async createUser(@Body() createUserRequest: CreateUserDto) {
    return await this.usersService.createUser(createUserRequest);
  }

  @UseGuards(SuperUserAuthGuard)
  @Get('/v1/GetUserList')
  async GetUserList() {
    return await this.usersService.getUserList();
  }

  @Get('/v1/test-email')
  async testEmail() {
    return await this.emailService.sendEmailVerificationMail(
      'nnm24mc052@nmamit.in',
      'Harshith P',
      'e258bad7-40bf-4afe-bd78-584588d91464',
    );
  }

  @Post('/v1/VerifyEmailUser')
  async verifyEmailUser(@Body() data: { userId: string }): Promise<string> {
    return await this.usersService.verifyUserEmail(data.userId);
  }

  @Post('/v1/SendPasswordResetLink')
  async sendPasswordResetLink(
    @Body() data: { userId: string },
  ): Promise<string> {
    return await this.usersService.sendPasswordResetLink(data.userId);
  }

  @Post('/v1/SendPasswordResetLinkByEmail')
  async sendPasswordResetLinkByEmail(
    @Body() data: { email: string },
  ): Promise<string> {
    return await this.usersService.sendPasswordResetLinkByEmail(data.email);
  }

  @Post('/v1/ChangePassword')
  async changePassword(
    @Req() req: Request,
    @Body() data: { oldPassword: string; newPassword: string },
  ): Promise<string> {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header');
    }
    const token = parts[1];
    // Verify token and extract user id (sub)
    await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const payload: any = this.jwtService.decode(token);
    const userId = payload?.sub as string | undefined;
    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return this.usersService.updateUserPassword(
      userId,
      data.oldPassword,
      data.newPassword,
    );
  }

  @Post('/v1/ResetPassword')
  async resetPassword(
    @Body() data: { userId: string; newPassword: string },
  ): Promise<string> {
    return this.usersService.resetUserPassword(data.userId, data.newPassword);
  }
}
