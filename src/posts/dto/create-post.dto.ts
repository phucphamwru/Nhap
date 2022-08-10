import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
