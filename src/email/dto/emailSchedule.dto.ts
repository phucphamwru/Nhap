import { IsString, IsNotEmpty, IsDateString, IsEmail, IsOptional } from 'class-validator';

export class EmailScheduleDto {
  @IsEmail()
  @IsOptional()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @IsDateString()
  date?: string;
}

export default EmailScheduleDto; 