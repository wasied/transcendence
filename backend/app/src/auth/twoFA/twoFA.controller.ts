import { Controller, Redirect, Request, Body, Get, Post, UseGuards } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';
import { RequestWithUser } from '../../utils/RequestWithUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/2fa')
export class TwoFAController {
	constructor(private twoFAService: TwoFAService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async handle2fa(@Request() request: RequestWithUser, @Body('code') code: string): Promise<Object> {
		return await this.twoFAService.handle2fa(request.user.id, code);
	}

	@Get('enable')
	async enable(@Request() request: RequestWithUser): Promise<Object> {
		return this.twoFAService.enable(request.user.id);
	}

	@Get('disable')
	async disable(@Request() request: RequestWithUser): Promise<Object> {
		return this.twoFAService.disable(request.user.id);
	}
}
