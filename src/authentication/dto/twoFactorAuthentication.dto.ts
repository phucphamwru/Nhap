import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TwoFactorAuthenticationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  twoFactorAuthenticationCode: string;
}
