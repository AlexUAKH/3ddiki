// strategies/jwt-refresh.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req?.body?.refresh_token;
        return typeof token === 'string' && token.length > 0 ? token : null;
      },
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.body?.refresh_token;
    if (typeof refreshToken !== 'string' || refreshToken.length === 0) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return { ...payload, refreshToken };
  }
}
