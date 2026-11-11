import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import JSZip from 'jszip';

@Injectable()
export class RadobotService {
  async downloadImages(baseUrl: string, lessonNumber: number): Promise<Buffer> {
    if (!baseUrl) {
      throw new BadRequestException('Invalid URL');
    }

    let parsedUrl: URL;
    let allDownloaded = false;

    try {
      parsedUrl = new URL(baseUrl);
    } catch {
      throw new BadRequestException('Invalid URL');
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new BadRequestException('Only HTTP and HTTPS are allowed');
    }

    // Avoid accidentally requesting unrelated hosts.
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    const zip = new JSZip();
    let downloaded = 0;

    while (!allDownloaded) {
      const filename = `robot-${lessonNumber}_${String(downloaded + 1).padStart(3, '0')}.webp`;
      const url = new URL(filename, normalizedBaseUrl);

      try {
        const response = await axios.get(url.toString(), {
          responseType: 'arraybuffer',
          timeout: 15000,
          maxContentLength: 20 * 1024 * 1024,
          maxBodyLength: 20 * 1024 * 1024,
          validateStatus: (status) => status === 200,
        });

        const contentType: any = response.headers['content-type'] || '';

        if (!contentType.startsWith('image/')) {
          continue;
        }

        zip.file(filename, response.data);
        downloaded++;
      } catch {
        // Missing images are skipped.
        console.warn(`Could not download ${url}`);
        allDownloaded = true;
      }
    }

    if (downloaded === 0) {
      throw new BadRequestException('No images were downloaded');
    }

    try {
      const buffer = await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: { level: 5 },
      });

      return buffer;
    } catch {
      throw new InternalServerErrorException('Could not create ZIP archive');
    }
  }
}
