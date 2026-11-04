import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfoByEmail(@Req() req) {
    return this.userService.getUserInfoByEmail(req.user.email);
  }

  @Get('roles-for-select')
  async getRolesForSelect() {
    return this.userService.getRolesForSelect();
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Req() req, @Body() email: string) {
    Logger.debug(`sendVerificationEmail user: ${JSON.stringify(req.user)}`);
    return this.userService.sendVerificationEmail(email);
    // return this.userService.sendVerificationEmail(req.user.email);
  }
}
