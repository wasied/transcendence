import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Session } from './session';
import { MatchHistory } from './match-history';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';

@Injectable()
export class SessionsService {
	async findAll(): Promise<Session[]> {
		const result = dbClient.query(
			`SELECT *	FROM sessions;`
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findAllActive(): Promise<Session[]> {
		const result = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE ended = false;`
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findUserHistoryByUserId(userId: number, my_username: string): Promise<MatchHistory[]> {
		console.log(userId);
		const result = await dbClient.query(
			`SELECT users.username, su.winner_uid
				FROM sessions_users su
				INNER JOIN users ON su.user_uid = users.id
				INNER JOIN sessions ON su.session_uid = sessions.id
				WHERE su.spectator = false
				AND su.session_uid  = $1;`
				/*IN (
					SELECT session_uid	FROM sessions_users
										WHERE user_uid = $1
										AND spectator = false
				);`*/
			[userId]
		)
			.then(queryResult => { return treatDbResult(queryResult); })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		var match_history: MatchHistory[] = [];
		for (const opponent of result) {
			var match: MatchHistory;
			match.my_username = my_username;
			match.opponent_username = opponent.username;
			if (opponent.winner_uid === userId)
				match.winner_username = my_username;
			else
				match.winner_username = opponent.username;
			match_history.push(match);
		}

		return match_history;
	}

	async findUserSessionsByUserId(userId: number): Promise<Session[]> {
		const result = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE id IN (
							SELECT session_uid	FROM sessions_users
												WHERE user_uid = $1
												AND spectator = false
						)
						AND ended = true;`,
				[userId]
		)
			.then(queryResult => { return treatDbResult(queryResult); })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findOne(session_id: number): Promise<Session[]> {
		const result = dbClient.query(
			`SELECT *	FROM sessions
						WHERE id = $1;`,
			[session_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	create(automatching: boolean, customization: boolean): void {
		const result = dbClient.query(
			`INSERT	INTO sessions(automatching, customization, ended)
					VALUES($1, $2, false);`,
			[automatching, customization]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	join(session_id: number, user_id: number, spectator: boolean): void {
		var status: string;
		if (spectator)
			status = "Spectating a game";
		else
			status = "Playing a game";
		const result = dbClient.query(
			`INSERT	INTO sessions_users(user_uid, session_uid, spectator)
					VALUES($1, $2, $3);
			UPDATE	users
					SET status = $4
					WHERE id = $1;`,
			[user_id, session_id, spectator, status]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	end(session_id: number, winner_uid: number): void {
		const result = dbClient.query(
			`UPDATE	sessions
					SET		ended = true,
							winner_uid = $1
					WHERE	id=$2;
			UPDATE	users
					SET		status = 'online'
					WHERE	id IN(
						SELECT user_uid	FROM sessions_users
										WHERE session_uid = $2
										AND spectator = false;
					);`,
			[winner_uid, session_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
}
