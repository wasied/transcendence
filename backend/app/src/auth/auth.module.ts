import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { OAuth42Strategy } from './oauth42.strategy';
import { TwoFAModule } from './twoFA/twoFA.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TwoFAModule,
  ],
  providers: [AuthService, OAuth42Strategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
