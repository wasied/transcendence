import { HttpException, HttpStatus, Controller, Request, Body, Param, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Session } from './session';
import { SessionsService } from './sessions.service';
import { MatchHistory } from './match-history';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto';
import { RequestWithUser } from '../utils/RequestWithUser';

@Controller('sessions')
@UseGuards(AuthGuard('jwt'))
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Get()
	async findAll(): Promise<Session[]> {
		return this.sessionsService.findAll();
	}

	@Get('active')
	async findAllActive(): Promise<Session[]> {
		return this.sessionsService.findAllActive();
	}

	@Get('history/:userId')
	async findUserHistoryByUserId(
		@Request() request: RequestWithUser,
		@Param('userId') userId: string
	): Promise<MatchHistory[]> {
		return this.sessionsService.findUserHistoryByUserId(+userId, request.user.username);
	}

	@Get(':sessionId')
	async findOne(@Param('sessionId') sessionId: string): Promise<Session> {
		const result = await this.sessionsService.findOne(+sessionId);
		if (!result.length)
			throw new HttpException("Session not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Post()
	create(@Body() body: CreateDto): void {
		this.sessionsService.create(body.automatching, body.customization);
	}
}
