// auth.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { type Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Маршрут для входа (передаем email и password в body)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user, {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Body('refresh_token') refreshToken: string) {
    return this.authService.logout(req.user.userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logoutAll')
  async logoutAll(@Req() req) {
    return this.authService.logoutAll(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt-refresh')) // check refresh-token
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user as any;

    return this.authService.refreshTokens(user.sub, user.refreshToken, {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  }

  // Пример ЗАЩИЩЕННОГО маршрута (доступен только с валидным JWT в Header)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // Вернет данные из JwtStrategy.validate()
  }

  @Post('resend-verification-email')
  @Throttle({
    default: {
      limit: 2,
      ttl: 60 * 60 * 1000,
      // blockDuration: 30 * 60 * 1000,
    },
  })
  async resendVerificationEmail(@Body('email') email: string) {
    return this.authService.resendVerificationEmail(email);
    // return this.authService.sendVerificationEmail(req.user.email);
  }

  @Post('verify-email')
  verifyEmail(@Body('token') token: string) {
    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Token is required');
    }

    return this.authService.verifyEmail(token);
  }

  @Post('forgot')
  @Throttle({
    default: {
      limit: 2,
      ttl: 30 * 60 * 1000,
      // blockDuration: 30 * 60 * 1000,
    },
  })
  forgotPassword(@Body('email') email: string) {
    if (!email || typeof email !== 'string')
      throw new BadRequestException('Email is required');
    return this.authService.forgotPassword(email);
  }

  @Post('change-password')
  changePassword(
    @Body('token') token: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Token is required');
    }

    return this.authService.changePassword(token, email, password);
  }
}

// @Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard) // Сначала проверяем токен, потом роли
// export class AdminController {
//   @Get('dashboard')
//   @Roles('Admin') // Доступ только для роли Admin
//   getAdminDashboard() {
//     return { message: 'Добро пожаловать, администратор' };
//   }
// }
