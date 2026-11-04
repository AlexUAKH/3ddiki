import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { RadobotService } from './radobot.service';

@Controller('radobot/image-downloader')
export class RadobotController {
  constructor(private readonly radobotService: RadobotService) {}

  @Post()
  async download(@Body() body: { baseUrl: string }, @Res() res: Response) {
    const buffer = await this.radobotService.downloadImages(body.baseUrl);

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="images.zip"',
      'Content-Length': buffer.length,
    });

    return res.send(buffer);
  }
}
