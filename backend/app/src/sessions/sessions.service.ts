import { Injectable } from '@nestjs/common';
import { Sessions } from './sessions';
import { dbClient } from '../db';

@Injectable()
export class SessionsService {
	findAllJoinable(): Sessions {
		const result = dbClient.query(
			"SELECT *	FROM sessions		\
						WHERE ended = false;"
		);

		return result;
	}

	findOne(session_id: number): Sessions {
		const result = dbClient.query(
			"SELECT *	FROM sessions	\
						WHERE id = $1;",
			[session_id]
		);

		return result;
	}

	create(automatching: boolean, customization: boolean): void {
		const result = dbClient.query(
			"INSERT	INTO sessions(automatching, customization, ended)	\
					VALUES($1, $2, false);",
			[automatching, customization]
		);
	}

	update(id: number, ended: boolean, winner_uid: number): void {
		const result = dbClient.query(
			"UPDATE	sessions		\
				SET	ended = $1,		\
					winner_uid = $2	\
			WHERE	id = $3;",
			[ended, winner_uid, id]
		);
	}
}
