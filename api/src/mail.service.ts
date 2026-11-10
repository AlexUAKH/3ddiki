import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // async sendWelcomeEmail(userEmail: string, name: string) {
  //   await this.mailerService.sendMail({
  //     to: userEmail,
  //     subject: 'Welcome to Our App!',
  //     template: './welcome', // Name of template file in /templates folder
  //     context: { name }, // Data to pass to template
  //   });
  // }

  async sendConfirmationEmail(email: string, name: string, url: string) {
    Logger.debug('in mail service');
    Logger.debug(`sendConfirmationEmail to ${email}`);
    Logger.debug(
      `mail options: ${JSON.stringify(this.mailerService.getTransporter().options)}`,
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Підтвердження елентронної пошти',
      template: './confirm-email', // Name of template file in /templates folder
      context: {
        name,
        url,
      }, // Data to pass to template
    });
  }
}
