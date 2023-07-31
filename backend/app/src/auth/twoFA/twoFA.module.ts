import { Module } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';
import { TwoFAController } from './twoFA.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TwoFAService, JwtService],
  controllers: [TwoFAController]
})
export class TwoFAModule {}
