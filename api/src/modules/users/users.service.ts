import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'generated/prisma/enums';
import { MailService } from 'src/mail.service';
import { CreateUserDto } from '../admin/customer/dto/create-user.dto';
import { UpdateUserDto } from '../admin/customer/dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailService,
    // private config: ConfigService,
  ) {}

  // admin

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user) throw new NotFoundException(`User ${dto.email} already exists`);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          lastName: dto.lastName,
          email: dto.email,
          role: dto.role,
          isEmailVerified: dto.isEmailVerified,
          password: this.generateRandomPassword(),
        },
      });

      if (!dto.isEmailVerified) {
        await this.mailer.sendConfirmationEmail(
          newUser.email,
          newUser.name,
          newUser.lastName,
        );
      }

      return newUser;
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Failed to create user: ${error.message}`,
      );
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (dto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`Email ${dto.email} is already in use`);
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  //  client
  getRolesForSelect() {
    return Object.values(Role);
  }

  async sendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException(`User ${email} was not found`);
    await this.mailer.sendConfirmationEmail(
      user.email,
      user.name,
      user.lastName,
    );

    return { message: `Verification email sent to ${email}` };
  }

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
  // helpers
  private generateRandomPassword(length: number = 8): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
}
