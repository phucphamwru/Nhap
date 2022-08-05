import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from 'src/entities/user.entity';
import { PrivateFilesService } from 'src/files/privateFiles.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly privateFilesService: PrivateFilesService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }

  async sendEmailInfo(user: User, fileId: number) {
    const file = await this.privateFilesService.getPrivateFile(fileId);
    if (file.info.owner.id === user.id) {
      const url = 'https://www.google.com/';
      const message = {
        to: user.email,
        subject: 'Send email with image',
        text: 'Plaintext version of the message',
        // html: "<p>HTML version of the message</p>"
        template: './sendWithImage',
        attachments: [
          {
            filename: 'sender1.jpg',
            content: file.stream,
            cid: 'sendImg',
          },
        ],
        context: {
          name: user.name,
          url: url,
          src: 'cid:sendImg',
        },
      };

      await this.mailerService.sendMail(message);
    } else {
      throw new UnauthorizedException();
    }
  }
}
