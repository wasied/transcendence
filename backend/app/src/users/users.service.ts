import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
			`INSERT	INTO users(id, username, status, a2f_key, profile_picture_url)
					VALUES($1, $2, $3, $4, $5);`,
			[user.id, user.username, "online", user.a2f_key, user.profile_picture_url]
		);
	}

	updateProfilePicture(user_id: number, url: string): void {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET		profile_picture_url = $1,
					WHERE	id = $2`,
			[url, user_id]
		);
	}

	async isOnline(user_id: number[]): Promise<boolean> {
		const queryResult = await dbClient.query(
			`SELECT status	FROM users
							WHERE id = $1;`,
			[user_id]
		);
		if (!queryResult.rows.length || !queryResult.rows[0] || !queryResult.rows[0].length)
			throw new HttpException("User not found.", HttpStatus.NOT_FOUND);

		if (queryResult.rows[0][0] === "offline")
			return false;
		else
			return true;
	}

	findStatus(user_id: number[]): void {
	}

	logIn(user_id: number): void {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET 	status=$1
					WHERE	id=$2;`,
			["online", user_id]
		);
	}

	logOut(user_id: number): void {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET		status=$1
					WHERE	id=$2;`,
			["offline", user_id]
		);
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
