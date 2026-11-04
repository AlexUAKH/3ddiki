import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(userEmail: string, name: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Welcome to Our App!',
      template: './welcome', // Name of template file in /templates folder
      context: { name }, // Data to pass to template
    });
  }

  async sendConfirmationEmail(
    email: string,
    firstName: string,
    lastName: string,
  ) {
    Logger.debug(`sendConfirmationEmail to ${email}`);
    Logger.debug(
      `mailerService: ${Object.keys(this.mailerService.getTransporter()).join('; ')}`,
    );
    Logger.debug(
      `mailerService: ${JSON.stringify(this.mailerService.getTransporter().options)}`,
    );
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email to get started on 3DDIKI',
      template: './confirm-email', // Name of template file in /templates folder
      context: {
        firstName: firstName,
        lastName: lastName,
      }, // Data to pass to template
    });
  }
}
