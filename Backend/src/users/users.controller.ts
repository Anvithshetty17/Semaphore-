import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';
import { EmailService } from 'src/email/email.service';

@Controller('/web/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
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

  @Post('/v1/ChangePassword')
  async changePassword(
    @Body() data: { oldPassword: string; newPassword: string; userId: string },
  ): Promise<string> {
    return this.usersService.updateUserPassword(
      data.userId,
      data.oldPassword,
      data.newPassword,
    );
  }
}
