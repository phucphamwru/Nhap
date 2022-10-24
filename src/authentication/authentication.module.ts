import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { TwoFactorAuthenticationController } from './two-factor/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './two-factor/twoFactorAuthentication.service';
import { JwtTwoFactorStrategy } from './jwt-two-factor.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    MailModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController, TwoFactorAuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    TwoFactorAuthenticationService,
    JwtTwoFactorStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
