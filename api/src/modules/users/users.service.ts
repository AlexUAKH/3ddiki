import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    // private config: ConfigService,
  ) {}

  async getUserInfoByEmail(email: string) {
    Logger.debug(`UsersService getUserInfoByEmail email: ${email}`);
    const userObject = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userObject) throw new NotFoundException(`User ${email} was not found`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userObject;

    return user;
  }
}
