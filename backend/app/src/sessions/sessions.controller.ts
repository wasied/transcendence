import { Controller, Body, Param, Get, Post, Put } from '@nestjs/common';
import { Sessions } from './sessions';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Get()
	async findAllJoinable(): Promise<Sessions> {
		return this.sessionsService.findAllJoinable();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Sessions> {
		return this.sessionsService.findOne(id);
	}

	@Post()
	async create(@Body('automatching') automatching: boolean, @Body('customization') customization: boolean): Promise<void> {
		this.sessionsService.create(automatching, customization);
	}

	@Put()
	async update(@Body('id') id: number, @Body('ended') ended: boolean, @Body('winner_uid') winner_uid: number): Promise<void> {
		this.sessionsService.update(id, ended, winner_uid);
	}
}
