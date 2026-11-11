import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

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
    name: string,
    url: string,
    password: string = '',
  ) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Підтвердження елентронної пошти',
      template: './confirm-email', // Name of template file in /templates folder
      context: {
        name,
        url,
        password,
      }, // Data to pass to template
    });
  }

  async sendResetPasswordEmail(email: string, name: string, url: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: 'Відновлення паролю',
      template: './reset-password-email', // Name of template file in /templates folder
      context: {
        name,
        url,
      }, // Data to pass to template
    });
  }
}
