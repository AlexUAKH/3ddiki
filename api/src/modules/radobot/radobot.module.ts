import { Module } from '@nestjs/common';
import { RadobotController } from './radobot.controller';
import { RadobotService } from './radobot.service';

@Module({
  controllers: [RadobotController],
  providers: [RadobotService],
})
export class RadobotModule {}
