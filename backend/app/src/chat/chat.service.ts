import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Chat } from './chat';
import { dbClient } from '../db';
import { treatDbResult } from '../utils/treatDbResult';

@Injectable()
export class ChatService {
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

	delete(chat_user_id: number, id: number): void {
		const result = dbClient.query( // We should manage access to calls to API and delete the IF
			`DELETE	FROM chatrooms
					WHERE id = $2;`,
			[chat_user_id, id]
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
