import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePostDto {
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

export default UpdatePostDto;
