import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Chat } from './chat';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';

@Injectable()
export class ChatService {
	/* Chat */

	async findAll(): Promise<Chat[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms;`
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findOne(id: number): Promise<Chat[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms
						WHERE id = $1;`,
			[id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	create(owner_uid: number, name: string, hidden: boolean, password: string): void {
		const result = dbClient.query(
			`INSERT	INTO chatrooms(name, owner_uid, hidden, password)
					VALUES($1, $2, $3, $4);`,
			[name, owner_uid, hidden, password]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	setHidden(chatroom_id: number, hidden: boolean): void {
		const result = dbClient.query(
			`UPDATE	chatrooms
					SET hidden = $1
					WHERE id = $2;`,
			[hidden, chatroom_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	delete(id: number): void {
		const result = dbClient.query(
			`DELETE	FROM chatrooms
					WHERE id = $1;`,
			[id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	/* Chat users */

	join(user_id: number, chatroom_id: number): void {
		const result = dbClient.query(
			`IF $1 NOT IN (
				SELECT user_uid	FROM chatrooms_users
								WHERE chatroom_uid = $2
			)
			THEN (
				INSERT INTO	chatrooms_users(chatroom_uid, user_uid, admin)
							VALUES($2, $1, false)
			)
			END IF;`,
			[user_id, chatroom_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	setAdmin(admin: boolean, chatroom_id: number, user_id: number) {
		const result = dbClient.query(
			`UPDATE	chatrooms_users
					SET admin = $1
					WHERE chatroom_uid = $2
					AND user_uid $3;`,
			[admin, chatroom_id, user_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	leave(user_id: number, chatroom_id: number): void {
		const result = dbClient.query(
			`DELETE	FROM	chatrooms_users
							WHERE user_uid = $1
							AND chatroom_uid = $2;`,
			[user_id, chatroom_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	/* Punishments */

	setPunishment(admin_id: number, target_id: number, chatroom_id: number, type: string, ends_at: string) {
		const result = dbClient.query(
			`INSERT INTO	chatrooms_punishments(
								chatroom_uid,
								chatroom_user_admin_uid,
								chatroom_user_target_uid,
								type,
								ends_at
							)
							VALUES($1, $2, $3, $4, $5)`,
			[chatroom_id, admin_id, target_id, chatroom_id, type, ends_at]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	/* For the guard */

	async findChatroomsOwnedByUserId(user_id: number): Promise<number[]> {
		const result = dbClient.query(
			`SELECT id	FROM chatrooms
						WHERE owner_uid = $1;`,
			[user_id]
		)
		.then(queryResult => {
			var resultList = [];	
			for (const row of queryResult.rows) {
				row.forEach((value, index) => { resultList.push(value) });
			}

			return resultList;
		})
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findChatroomsWhereUserIdIsAdmin(user_id: number): Promise<number[]> {
		const result = dbClient.query(
			`SELECT chatroom_uid AS id	FROM chatrooms_users
										WHERE user_uid = $1
										AND admin = true;`,
			[user_id]
		)
		.then(queryResult => {
			var resultList = [];	
			for (const row of queryResult.rows) {
				row.forEach((value, index) => { resultList.push(value) });
			}

			return resultList;
		})
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}
}
