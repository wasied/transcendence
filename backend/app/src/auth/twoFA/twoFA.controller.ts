import { Controller, Redirect, Request, Body, Get, Post } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';

@Controller('2fa')
export class TwoFAController {
	constructor(private twoFAService: TwoFAService) {}

	@Post()
	@Redirect()
	async handle2fa(@Request() request: any, @Body('code') code: string): Promise<Object> {
		return await this.twoFAService.handle2fa(request.user.id, code);
	}

	@Post('enable')
	async enable(@Body('id') id: number): Promise<Object> {
		return this.twoFAService.enable(id);
	}

	@Post('disable')
	async disable(@Body('id') id: number): Promise<void> {
		this.twoFAService.disable(id);
	}
}
