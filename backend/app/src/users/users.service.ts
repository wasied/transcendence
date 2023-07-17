import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Session } from '../sessions/session';
import { dbClient } from '../db';

// Store ts-postgres Client instance somewhere

@Injectable()
export class UsersService {
	async findAll(): Promise<User[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM users;`
		);

		var result = [];
		for (const row of queryResult.rows) {
			var user = {};
			row.forEach((value, index) => {
				user[queryResult.names[index]] = value;
			});
			result.push(user);
		}

		return result;
	}

	async findOneByUsername(username: string): Promise<User[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM users
						WHERE username = $1;`,
			[username]
		);

		var result = [];
		for (const row of queryResult.rows) {
			var user = {};
			row.forEach((value, index) => {
				user[queryResult.names[index]] = value;
			});
			result.push(user);
		}

		return result;
	}

	async findOneById(user_id: number): Promise<User[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM users
						WHERE id = $1;`,
			[user_id]
		);

		var result = [];
		for (const row of queryResult.rows) {
			var user = {};
			row.forEach((value, index) => {
				user[queryResult.names[index]] = value;
			});
			result.push(user);
		}


		return result;
	}

	async findUserSessions(user_id: number): Promise<Session[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE id = (SELECT session_uid	FROM sessions_users
														WHERE user_uid = $1
														AND spectator = false;
						);`,
			[user_id]
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

	create(user: User): void {
		const queryResult = dbClient.query(
			`INSERT	INTO users(username, a2f_key, profile_image_url, phone_number)
					VALUES($1, $2, $3 $4);`,
			[user.username, user.a2f_key, user.profile_image_url, user.phone_number]
		);
	}

	update(user: User): void {
	}

	/*** Block/Unblock users ***/

	block(blocker_uid: number, blocked_uid: number): void {
		const queryResult = dbClient.query(
			`INSERT	INTO blocked(blocker_uid, blocked_uid)
					VALUES($1, $2);`,
			[blocker_uid, blocked_uid]
		);
	}

	unblock(blocking_id: number): void {
		const queryResult = dbClient.query(
			`DELETE	FROM blocked
					WHERE id = $1`,
			[blocking_id]
		);
	}
}
