import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailScheduleDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  recipient: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsDateString()
  date?: string;
}

export default EmailScheduleDto;
