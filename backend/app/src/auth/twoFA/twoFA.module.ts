import { Module } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';
import { TwoFAController } from './twoFA.controller';

@Module({
  providers: [TwoFAService],
  controllers: [TwoFAController]
})
export class TwoFAModule {}
