import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import EmailScheduleDto from './dto/emailSchedule.dto';
import EmailSchedulingService from './emailScheduling.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    await this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
