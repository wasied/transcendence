import { Controller, Param, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatsService } from './stats.service';
import { Stats } from './stats';
import { User } from '../users/user';
import { RequestWithUser } from '../utils/RequestWithUser';

@Controller('stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
	constructor(private statsService: StatsService) {}

	@Get()
	async findOne(@Request() request: RequestWithUser) {
		return this.statsService.findOneByUserId(request.user.id);
	}

	@Get('ladder')
	async findLadder(): Promise<User[]> {
		return this.statsService.findLadder();
	}

	@Get(':user_id')
	async findOneByUserId(@Param('user_id') user_id: number): Promise<Stats> {
		return this.statsService.findOneByUserId(user_id);
	}

}
