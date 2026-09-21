import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new UnprocessableEntityException({
        message: `User ${email} doesn't exist`,
        field: 'email',
      });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnprocessableEntityException('Invalid password');

    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private ACCESS_TOKEN_EXPIRE_IN =
    Number(process.env.JWT_EXPIRES_IN_MINUTES || 15) * 60;
  private REFRESH_TOKEN_EXPIRE_IN =
    Number(process.env.JWT_REFRESH_DAYS || 7) * 24 * 60 * 60;

  private async generateTokens(userId: string, email: string, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
          expiresIn: this.ACCESS_TOKEN_EXPIRE_IN,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
          expiresIn: this.REFRESH_TOKEN_EXPIRE_IN,
        },
      ),
    ]);

    return { access_token, refresh_token };
  }

  async login(
    user: User,
    { userAgent, ip }: { userAgent?: string; ip?: string },
  ) {
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: await bcrypt.hash(tokens.refresh_token, 10),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        userAgent,
        ip,
      },
    });
    return { ...tokens, expire_at: this.ACCESS_TOKEN_EXPIRE_IN, user };
  }

  /**
   * Tokens rotation(update) function
   * @param userId user ID from payload in refresh-token
   * @param refreshToken current refresh-token (from request)
   * @param deviceInfo optional: new device information
   */
  async refreshTokens(
    userId: string,
    refreshToken: string,
    { userAgent, ip }: { userAgent?: string; ip?: string },
  ) {
    // 1. get user and all user's sessions
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { sessions: true },
    });

    if (!user || !user.sessions.length) {
      throw new UnauthorizedException('Access denied. Sessions was not found.');
      // Доступ запрещен. Сессии не найдены
    }

    // 2. search session, by refresh-token
    let currentSession: any = null;

    for (const session of user.sessions) {
      const isMatch = await bcrypt.compare(refreshToken, session.refreshToken);
      if (isMatch) {
        currentSession = session;
        break;
      }
    }

    // 3. If token doesn't exist, probably it was stollen.
    // By security reasons, delete all user's sessions
    if (!currentSession) {
      await this.prisma.session.deleteMany({ where: { userId } });
      throw new ForbiddenException(
        'Attention! A hacking attempt was detected. All sessions have been reset.',
      );
      // 'Внимание! Обнаружена попытка взлома. Все сессии сброшены.'
    }

    // 4. Check if the token expiration date has passed
    if (currentSession.expiresAt < new Date()) {
      // delete if has expired
      await this.prisma.session.delete({ where: { id: currentSession.id } });
      throw new UnauthorizedException(
        'Your token has expired. Please log in again.',
      );
      // Срок действия токена истек. Войдите заново.
    }

    // 5. generate new tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // bcrypt new refresh token
    const newSubTokenHash = await bcrypt.hash(tokens.refresh_token, 10);

    // 6. ПРИМЕНЯЕМ РОТАЦИЮ В ОДНОЙ ТРАНЗАКЦИИ:
    // Удаляем старую использованную сессию и создаем новую для нового токена.
    await this.prisma.$transaction([
      this.prisma.session.delete({
        where: { id: currentSession.id },
      }),
      this.prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: newSubTokenHash,
          expiresAt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRE_IN),
          userAgent: userAgent || currentSession.userAgent,
          ip: ip || currentSession.ip,
        },
      }),
    ]);

    return tokens;
  }

  async logout(userId: string, refreshToken: string) {
    // get all user's sessions
    Logger.debug(`userId: ${userId}`);
    Logger.debug(`refreshToken: ${refreshToken}`);
    const sessions = await this.prisma.session.findMany({
      where: { userId },
    });
    Logger.debug(`session: ${sessions.length}`);

    for (const session of sessions) {
      const isMatch = await bcrypt.compare(refreshToken, session.refreshToken);
      if (isMatch) {
        // delete session
        await this.prisma.session.delete({
          where: { id: session.id },
        });
        break;
      }
    }
    // 'Успешный выход из системы'
    return { message: 'You have successfully logged out' };
  }

  async logoutAll(userId: string) {
    Logger.debug(`loggoutAll user: ${userId}`);

    await this.prisma.session.deleteMany({
      where: { userId },
    });
    return {
      message: 'You have successfully logged out from all devices.',
    };
  }
}
