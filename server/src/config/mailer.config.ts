import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { devMode } from "src/assets/dev";

export const getMailerConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => ({
  transport: {
    host: configService.get("SMTP_SERVER"),
    port: devMode(configService) ? 587 : 465,
    secure: !devMode(configService),
    auth: {
      user: configService.get("SMTP_LOGIN"),
      pass: configService.get("SMTP_PASSWORD"),
    },
  },
  defaults: {
    from: '"coffee-shop" <no-reply@coffee-shop.ru>',
  },
});
