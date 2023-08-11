import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Chat } from './chat';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';

@Injectable()
export class ChatService {
	/* Chat */

	async findAllChatrooms(): Promise<Chat[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms
						WHERE direct_message = false;`
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findUserChatrooms(user_id: number): Promise<Chat[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms
						WHERE direct_message = false
						AND id IN (
							SELECT chatroom_uid	FROM chatrooms_users
												WHERE user_uid = $1
						);`,
			[user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findUserDirectMessages(user_id: number): Promise<Chat[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms
						WHERE direct_message = true
						AND id IN (
							SELECT chatroom_uid	FROM chatrooms_users
												WHERE user_uid = $1
						);`,
			[user_id]
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

	async findChatroomUsersId(chatroom_id: number): Promise<number[]> {
		const result = await dbClient.query(
			`SELECT user_uid	FROM chatrooms_users
								WHERE chatroom_uid = $1;`,
			[chatroom_id]
		)
		.then(queryResult => {
			var result: number[] = [];
			for (const row of queryResult.rows)
				result.push(+row[0]);

			return result;
		})
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async create(owner_uid: number, name: string, password: string | null, direct_message: boolean): Promise<number> {
		const result = await dbClient.query(
			`INSERT	INTO chatrooms(name, owner_uid, password, direct_message)
					VALUES($1, $2, $3, $4)
					RETURNING chatrooms.id;`,
			[name, owner_uid, password, direct_message]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (!result || !result.length)
			throw new HttpException('Create chatroom: error', HttpStatus.BAD_REQUEST);

		return result[0].id;
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

	updateName(chatroom_id: number, name: string): void {
		const result = dbClient.query(
			`UPDATE	chatrooms
					SET name = $1
					WHERE id = $2;`,
			[name, chatroom_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	updatePassword(chatroom_id: number, password: string | null): void {
		const result = dbClient.query(
			`UPDATE	chatrooms
					SET password = $1
					WHERE id = $2;`,
			[password, chatroom_id]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	async delete(id: number): Promise<void> {
		await dbClient.query(
			`DELETE	FROM chatrooms_messages
					WHERE chatroom_user_uid IN (
						SELECT id	FROM chatrooms_users
									WHERE chatroom_uid = $1
					);`,
			[id]
		)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		await dbClient.query(
			`DELETE	FROM chatrooms_users
					WHERE chatroom_uid = $1`,
			[id]
		)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		const result = await dbClient.query(
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
			`INSERT INTO	chatrooms_users(chatroom_uid, user_uid, admin)
							VALUES($2, $1, false);`,
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

	async leave(user_id: number, chatroom_id: number): Promise<void> {
		await dbClient.query(
			`DELETE	FROM chatrooms_messages
					WHERE chatroom_user_uid IN (
						SELECT id	FROM chatrooms_users
									WHERE chatroom_uid = $1
									AND user_uid = $2
					);`,
			[chatroom_id, user_id]
		)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
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

	async findUserPunishments(user_id: number) {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms_punishments
						WHERE chatroom_user_target_uid IN (
							SELECT id	FROM chatrooms_users
										WHERE user_uid = $1
						);`,
			[user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

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

	/* messages */

/*
	async getMessagesByChatroomId(chatroom_id: number): Promise<any[]> {
		const result = dbClient.query(
			`SELECT * FROM chatrooms_messages WHERE chatroom_uid = $1 ORDER BY created_at DESC;`,
			[chatroom_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async addMessageToChatroom(chatroom_user_uid: number, content: string): Promise<void> {
		const result = dbClient.query(
			`INSERT INTO chatrooms_messages(chatroom_user_uid, content) VALUES($1, $2);`,
			[chatroom_user_uid, content]
		)
		.then(queryResult => { return queryResult; })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
*/

	/* For the guard */

	async findChatroomUserId(user_id: number, chatroom_id: number): Promise<number> {
		const result = await dbClient.query(
			`SELECT id	FROM chatrooms_users
						WHERE chatroom_uid = $1
						AND user_uid = $2;`,
			[chatroom_id, user_id]
		)
			.then(queryResult => { return treatDbResult(queryResult); })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (!result || !result.length)
			throw new HttpException("Chatroom user not found", HttpStatus.NOT_FOUND);

		return result[0].id;
	}

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
