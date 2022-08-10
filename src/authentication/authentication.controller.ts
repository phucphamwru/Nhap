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
import { UsersService } from 'src/users/users.service';
import JwtRefreshGuard from './jwt-refresh.guard';
import LogInDto from './dto/login.dto';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiBody({ type: LogInDto })
  @Post('log-in')
  async logIn(@CurrentUser() user: User) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const refreshToken =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return { accessTokenCookie, refreshToken };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@CurrentUser() user: User) {
    await this.usersService.removeRefreshToken(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@CurrentUser() user: User) {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@CurrentUser() user: User) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    return accessTokenCookie;
  }
}
