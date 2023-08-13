import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Session } from './session';
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
		const result = dbClient.query(
			`SELECT *	FROM sessions
						WHERE ended = false;`
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

	async findUserHistoryByUserId(userId: number): Promise<Session[]> {
		const result = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE id IN (
							SELECT session_uid	FROM sessions_users
												WHERE user_uid = $1
						);`,
			[userId]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async create(automatching: boolean, customization: boolean): Promise<number> {
		try {
			const queryResult = await dbClient.query(
				`INSERT INTO sessions(automatching, customization, ended)
					VALUES($1, $2, false)
					RETURNING id;`,
				[automatching, customization]
			);
	
			return (queryResult.rows[0][0] as number);
		} catch (err) {
			throw new HttpException(err, HttpStatus.BAD_REQUEST);
		}
	}

	async join(session_id: number, user_id: number, spectator: boolean): Promise<void> {
		await dbClient.query(
			`INSERT INTO sessions_users(user_uid, session_uid, spectator)
				VALUES($1, $2, $3);`,
			[user_id, session_id, spectator]
		)
			.then(queryResult => { return queryResult; })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (spectator)
			return ;
		await dbClient.query(
			`UPDATE users
				SET status = $1
				WHERE id = $2;`,
			["Playing a game", user_id]
		)
			.then(queryResult => { return queryResult; })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	async end(session_id: number, winner_uid: number): Promise<void> {
		await dbClient.query(
			`UPDATE sessions
			SET ended = true,
				winner_uid = $1
			WHERE id=$2;`,
			[winner_uid, session_id]
		)
			.then(queryResult => { return queryResult; })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		await dbClient.query(
			`UPDATE users
			SET status = 'online'
			WHERE id IN (
				SELECT user_uid FROM sessions_users
				WHERE session_uid = $1 AND spectator = false
			);`,
			[session_id]
		)
			.then(queryResult => { return queryResult; })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
}
