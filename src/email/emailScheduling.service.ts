import { Injectable } from '@nestjs/common';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { EmailService } from './email.service';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService, //private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    return this.emailService.sendMail({
      to: emailSchedule.recipient,
      subject: emailSchedule.subject,
      text: emailSchedule.content,
    });
  }
}
