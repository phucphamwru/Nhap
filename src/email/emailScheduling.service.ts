import { Injectable } from '@nestjs/common';
import EmailScheduleDto from './dto/emailSchedule.dto';
import { EmailService } from './email.service';
//import { SchedulerRegistry } from '@nestjs/schedule';
//import { CronJob } from 'cron';

@Injectable()
export default class EmailSchedulingService {
  constructor(
    private readonly emailService: EmailService,
    //private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDto) {
    return this.emailService.sendMail({
      to: emailSchedule.recipient,
      subject: emailSchedule.subject,
      text: emailSchedule.content
    })

    // //schedule emails using cron
    // const date = new Date(emailSchedule.date);
    // const job = new CronJob(date, () => {
    //   this.emailService.sendMail({
    //     to: emailSchedule.recipient,
    //     subject: emailSchedule.subject,
    //     text: emailSchedule.content
    //   })
    // });

    // //unique names for the scheduled emails
    // this.schedulerRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);
    // job.start();
  }
}