import { Injectable } from '@nestjs/common';
import { Session } from './session';
import { dbClient } from '../db';

@Injectable()
export class SessionsService {
	async findAllJoinable(): Promise<Session[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE ended = false;`
		);

		var result = [];
		for (const row of queryResult.rows) {
			var session = {};
			row.forEach((value, index) => {
				session[queryResult.names[index]] = value;
			});
			result.push(session);
		}

		return result;
	}

	async findOne(session_id: number): Promise<Session[]> {
		const queryResult = dbClient.query(
			`SELECT *	FROM sessions
						WHERE id = $1;`,
			[session_id]
		);

		var result = [];
		for (const row of queryResult.rows) {
			var session = {};
			row.forEach((value, index) => {
				session[queryResult.names[index]] = value;
			});
			result.push(session);
		}

		return result;
	}

	create(automatching: boolean, customization: boolean): void {
		const result = dbClient.query(
			`INSERT	INTO sessions(automatching, customization, ended)
					VALUES($1, $2, false);`,
			[automatching, customization]
		);
	}

	update(session: Session): void {
	}

	join(session_id: number, user_id: number, spectator: boolean): void {
		if (spectator) {
			const result = dbClient.query(
				`INSERT	INTO sessions_users(user_uid, session_uid, spectator)
						VALUES($1, $2, $3);
				UPDATE	users
						SET state = 'Spectating a game'
						WHERE id = $1;`,
				[user_id, session_id, spectator]
			);
		}
		else {
			const result = dbClient.query(
				`INSERT	INTO sessions_users(user_uid, session_uid, spectator)
						VALUES($1, $2, $3);
				UPDATE	users
						SET state = 'Playing a game'
						WHERE id = $1;`,
				[user_id, session_id, spectator]
			);
		}
	}

	end(session_id: number, winner_uid: number): void {
		const result = dbClient.query(
			`UPDATE	sessions
					SET		ended = true,
							winner_uid = $1
					WHERE	id=$2;
			UPDATE	users
					SET		state = 'online'
					WHERE	id IN(
						SELECT user_uid	FROM sessions_users
										WHERE session_uid = $2
										AND spectator = false;
					);`,
		[winner_uid, session_id]
		);
	}
}
