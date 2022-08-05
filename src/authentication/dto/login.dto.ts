import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LogInDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  password: string;
}

export default LogInDto;
