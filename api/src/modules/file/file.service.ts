import { Injectable, NotFoundException } from '@nestjs/common';

import fs from 'fs';
import { MediaType } from 'generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    file: Express.Multer.File | Express.Multer.File[],
    { ownerId, ownerType }: CreateFileDto,
  ) {
    const width: number | null = null;
    const height: number | null = null;

    // if (file.mimetype.includes('image')) {
    //   const meta = await sharp(file.path).metadata();
    //   width = meta.width || null;
    //   height = meta.height || null;

    //   await sharp(file.path)
    //     .resize(300)
    //     .webp()
    //     .toFile(`uploads/thumb-${file.filename}.webp`);
    // }

    const filesArray = Array.isArray(file) ? file : [file];

    const data = filesArray.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      width,
      height,
      type: (file.mimetype.includes('image')
        ? 'IMAGE'
        : file.mimetype.includes('video')
          ? 'VIDEO'
          : 'DOCUMENT') as MediaType,
      ownerType,
      ownerId,
    }));

    return this.prisma.file.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async getFile(id: number) {
    return this.prisma.file.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteFile(id: number) {
    const media = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!media) throw new NotFoundException();

    if (fs.existsSync(media.path)) {
      fs.unlinkSync(media.path);
    }

    const thumb = `uploads/thumb-${media.filename}.webp`;

    if (fs.existsSync(thumb)) {
      fs.unlinkSync(thumb);
    }

    return this.prisma.file.delete({
      where: { id },
    });
  }
}
