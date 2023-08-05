import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user';
import { Session } from '../sessions/session';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';

@Injectable()
export class UsersService {
	async findAll(): Promise<User[]> {
		const result = await dbClient.query(
			`SELECT *	FROM users;`
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findOneByUsername(username: string): Promise<User[]> {
		const result = await dbClient.query(
			`SELECT *	FROM users
						WHERE username = $1;`,
			[username]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findOneById(user_id: number): Promise<User[]> {
		const result = await dbClient.query(
			`SELECT *	FROM users
						WHERE id = $1;`,
			[user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findPlaying(): Promise<User[]> {
		const result = await dbClient.query(
			`SELECT *	FROM users
						WHERE status = $1;`,
			["Playing a game"]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findUserSessions(user_id: number): Promise<Session[]> {
		const result = await dbClient.query(
			`SELECT *	FROM sessions
						WHERE id IN (
							SELECT session_uid	FROM sessions_users
												WHERE user_uid = $1
												AND spectator = false;
						);`,
			[user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	create(user: User): void {
		const result = dbClient.query(
			`INSERT	INTO users(id, username, status, a2f_key, profile_picture_url)
					VALUES($1, $2, $3, $4, $5);`,
			[user.id, user.username, "online", user.a2f_key, user.profile_picture_url]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	updateUsername(user_id: number, username: string): void {
		const result = dbClient.query(
			`UPDATE	users
					SET		username = $1,
					WHERE	id = $2`,
			[username, user_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	updateProfilePicture(user_id: number, url: string): void {
		const result = dbClient.query(
			`UPDATE	users
					SET		profile_picture_url = $1,
					WHERE	id = $2`,
			[url, user_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	async isOnline(user_id: number[]): Promise<boolean> {
		const result = await dbClient.query(
			`SELECT status	FROM users
							WHERE id = $1;`,
			[user_id]
		);
		if (!result.rows.length || !result.rows[0] || !result.rows[0].length)
			throw new HttpException("User not found.", HttpStatus.NOT_FOUND);

		if (result.rows[0][0] === "offline")
			return false;
		else
			return true;
	}

	findStatus(user_id: number[]): void {
	}

	logIn(user_id: number): void {
		const result = dbClient.query(
			`UPDATE	users
					SET 	status=$1
					WHERE	id=$2;`,
			["online", user_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	logOut(user_id: number): void {
		const result = dbClient.query(
			`UPDATE	users
					SET		status=$1
					WHERE	id=$2;`,
			["offline", user_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	/*** Block/Unblock users ***/

	block(blocker_uid: number, blocked_uid: number): void {
		const result = dbClient.query(
			`INSERT	INTO blocked(blocker_uid, blocked_uid)
					VALUES($1, $2);`,
			[blocker_uid, blocked_uid]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	unblock(blocking_id: number): void {
		const result = dbClient.query(
			`DELETE	FROM blocked
					WHERE id = $1`,
			[blocking_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
}
