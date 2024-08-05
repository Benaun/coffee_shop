import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import ConfirmMail from 'mail/confirm-mail';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(to: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  sendVerification(to: string, verifLink: string) {
    const html = render(ConfirmMail({ url: verifLink }));
    return this.sendEmail(to, 'Подтверждение почты', html);
  }
}
