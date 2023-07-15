import { Injectable } from '@nestjs/common';
import { Users } from './users';
import { User } from './user';
import { Sessions } from '../sessions/sessions';
import { dbClient } from '../db';

// Store ts-postgres Client instance somewhere

@Injectable()
export class UsersService {
	findAll(): Users {
		const result = dbClient.query(
			"SELECT *	FROM users;"
		);

		return result;
	}

	findOneByUsername(username: string): User {
		const result = dbClient.query(
			"SELECT *	FROM users	\
						WHERE username = $1;",
			[username]
		);

		return result;
	}

	findOneById(user_id: number): User {
		const result = dbClient.query(
			"SELECT *	FROM users	\
						WHERE id = $1;",
			[user_id]
		);

		return result;
	}

	findUserSessions(user_id: number): Sessions {
		const result = dbClient.query(
			"SELECT *	FROM sessions											\
						WHERE id = (SELECT session_uid	FROM sessions_users		\
														WHERE user_uid = $1		\
														AND spectator = false;	\
						);",
			[user_id]
		);

		return result;
	}

	create(user: User): void {
		const result = dbClient.query(
			"INSERT	INTO users(username, a2f_key, profile_image_url, phone_number)	\
					VALUES();"
		);
	}

	update(user: User): void {
	}

	/*** Block/Unblock users ***/

	block(blocker_uid: number, blocked_uid: number): void {
		const result = dbClient.query(
			"INSERT	INTO blocked(blocker_uid, blocked_uid)	\
					VALUES($1, $2);",
			[blocker_uid, blocked_uid]
		);
	}

	unblock(blocking_id: number): void {
		const result = dbClient.query(
			"DELETE	FROM blocked	\
					WHERE id = $1",
			[blocking_id]
		);
	}
}
