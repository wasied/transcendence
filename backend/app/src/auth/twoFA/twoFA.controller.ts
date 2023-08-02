import { Controller, Redirect, Request, Body, Get, Post, UseGuards } from '@nestjs/common';
import { TwoFAService } from './twoFA.service';
import { RequestWithUser } from '../../utils/RequestWithUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/2fa')
export class TwoFAController {
	constructor(private twoFAService: TwoFAService) {}

	@Post()
	async handle2fa(@Body() body: { id: number, code: any }): Promise<Object> {
		return await this.twoFAService.handle2fa(body.id, body.code);
	}

	@Get('enable')
	@UseGuards(AuthGuard('jwt'))
	async enable(@Request() request: RequestWithUser): Promise<Object> {
		return this.twoFAService.enable(request.user.id);
	}

	@Get('disable')
	@UseGuards(AuthGuard('jwt'))
	async disable(@Request() request: RequestWithUser): Promise<Object> {
		return this.twoFAService.disable(request.user.id);
	}
}
