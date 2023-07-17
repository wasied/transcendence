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

	update(id: number, ended: boolean, winner_uid: number): void {
		const result = dbClient.query(
			`UPDATE	sessions
				SET	ended = $1,
					winner_uid = $2
			WHERE	id = $3;`,
			[ended, winner_uid, id]
		);
	}
}
