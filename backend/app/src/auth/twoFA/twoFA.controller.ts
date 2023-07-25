import { Controller, Body, Get, Post } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';

@Controller('2fa')
export class TwoFAController {
	constructor(private twoFAService: TwoFAService) {}

	@Post('enable')
	async enable(@Body('id') id: number): Promise<Object> {
		return this.twoFAService.enable(id);
	}

	@Post('disable')
	async disable(@Body('id') id: number): Promise<void> {
		this.twoFAService.disable(id);
	}

	@Post('verify')
	async verify(@Body('id') id: number, @Body('code') code: string): Promise<boolean> {
		return this.twoFAService.verify(id, code);
	}
}
