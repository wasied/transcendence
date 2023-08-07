import { HttpException, HttpStatus, Controller, Body, Param, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Session } from './session';
import { SessionsService } from './sessions.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

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

	@Get(':sessionId')
	async findOne(@Param('sessionId') sessionId: number): Promise<Session> {
		const result = await this.sessionsService.findOne(sessionId);
		if (!result.length)
			throw new HttpException("Session not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Get('history/user/:userId')
	async findUserHistoryByUserId(@Param('userId') userId: number): Promise<Session[]> {
		return this.sessionsService.findUserHistoryByUserId(userId);
	}

	@Post()
	create(@Body() body: CreateDto): void {
		this.sessionsService.create(body.automatching, body.customization);
	}
}
