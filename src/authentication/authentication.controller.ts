import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import User from 'src/entities/user.entity';
import { CurrentUser } from '../utils/user.decorator';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@CurrentUser() user: User) {
    return this.authenticationService.getCookieWithJwtToken(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut() {
    return true;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@CurrentUser() user: User) {
    return user;
  }
}
