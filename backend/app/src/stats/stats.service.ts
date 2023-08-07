import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Stats } from './stats';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';
import { SessionsService } from '../sessions/sessions.service';
import { Session } from '../sessions/session';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';

@Injectable()
export class StatsService {
	constructor(
		private sessionsService: SessionsService,
		private usersService: UsersService
	) {}

	async findLadder(): Promise<User[]> {
		const sessions = await this.sessionsService.findAll()
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		var count_wins: { [user_id: number]: number } = {};
		for (const session of sessions) {
			if (!count_wins[session.winner_uid])
				count_wins[session.winner_uid] = 1;
			else
				++count_wins[session.winner_uid];
		}
		var ladder: number[] = [];
		while (Object.keys(count_wins).length) {
			const index = Object.values(count_wins).indexOf(Math.max(...Object.values(count_wins)));
			const user_id: number = +Object.keys(count_wins)[index];
			if (!delete count_wins[user_id]) { throw new HttpException("Error", HttpStatus.BAD_REQUEST); }
			ladder.push(+user_id);
		}
		var result: User[] = [];
		for (const user_id of ladder) {
			const user = await this.usersService.findOneById(user_id)
				.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
			if (user && user.length)
				result.push(user[0]);
		}

		return result;
	}

	async findOneByUserId(user_id: number): Promise<Stats> {
		const sessions = await this.sessionsService.findUserHistoryByUserId(user_id)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (!sessions.length) {
			return {
				wins: 0,
				losses: 0,
				games_played: 0,
				win_ratio: '0'
			};
		}
		var games_played: number = sessions.length;
		var wins: number = 0;
		for (const session of sessions) {
			if (!session.ended) {
				--games_played;
				continue ;
			}
			if (session.winner_uid === user_id)
				++wins;
		}
		const losses: number = games_played - wins;
		const win_ratio = (games_played > 0) ? String((wins / games_played).toFixed(2)) : '0';

		return {
			wins: wins,
			losses: losses,
			games_played: games_played,
			win_ratio: win_ratio
		};
	}
}
