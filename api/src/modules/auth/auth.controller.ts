// auth.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { type Request, type Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshGuard } from './guards/refresh.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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

  @UseGuards(RefreshGuard) // check refresh-token
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user as any;

    return this.authService.refreshTokens(user.sub, user.refreshToken, {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.usersService.getAdminUserProfile(req.user.userId);
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

  @UseGuards(LocalAuthGuard)
  @Post('client/login')
  async clientLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(req.user, {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    this.setClientAuthCookies(response, result);
    return { user: result.user };
  }

  @UseGuards(RefreshGuard)
  @Post('client/refresh')
  async clientRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user as any;
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.refreshToken,
      {
        userAgent: req.headers['user-agent'],
        ip: req.ip,
      },
    );

    this.setClientAuthCookies(response, tokens);
    return { ok: true };
  }

  @Post('client/logout')
  async clientLogout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logoutClient(req.cookies?.refresh_token);
    this.clearClientAuthCookies(response);
    return { message: 'You have successfully logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('client/me')
  getClientUser(@Req() req) {
    return this.authService.getClientUser(req.user.userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('client-profile')
  // getClientUser(@Req() req) {
  //   return this.authService.getClientUser(req.user.userId);
  // }

  private setClientAuthCookies(
    response: Response,
    tokens: { access_token: string; refresh_token: string },
  ) {
    const commonOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookie('access_token', tokens.access_token, {
      ...commonOptions,
      maxAge: Number(process.env.JWT_EXPIRES_IN_MINUTES || 15) * 60 * 1000,
    });
    response.cookie('refresh_token', tokens.refresh_token, {
      ...commonOptions,
      maxAge: Number(process.env.JWT_REFRESH_DAYS || 7) * 24 * 60 * 60 * 1000,
    });
  }

  private clearClientAuthCookies(response: Response) {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.clearCookie('access_token', options);
    response.clearCookie('refresh_token', options);
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
