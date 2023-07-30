import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TwoFAModule } from './twoFA/twoFA.module';
import { UsersService } from '../users/users.service';
import { TwoFAService } from './twoFA/twoFA.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TwoFAModule,
  ],
  providers: [AuthService, JwtStrategy, UsersService, TwoFAService],
  controllers: [AuthController],
})
export class AuthModule {}
