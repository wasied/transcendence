import { Injectable } from '@nestjs/common';
import { Chat } from './chat';
import { dbClient } from '../db';

// Store ts-postgres Client instance somewhere

@Injectable()
export class ChatService {
	async findAll(): Promise<Chat[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM chatrooms;`
		);

		var result = [];
		for (const row of queryResult.rows) {
			var chat = {};
			row.forEach((value, index) => {
				chat[queryResult.names[index]] = value;
			});
			result.push(chat);
		}

		return result;
	}

	async findOne(id: number): Promise<Chat[]> {
		const queryResult = await dbClient.query(
			`SELECT *	FROM chatrooms
						WHERE id = $1;`,
			[id]
		);

		var result = [];
		for (const row of queryResult.rows) {
			var chat = {};
			row.forEach((value, index) => {
				chat[queryResult.names[index]] = value;
			});
			result.push(chat);
		}

		return result;
	}

	create(chat: Chat): void {
		var result;
		if (chat.hidden) {
			result = dbClient.query(
				`INSERT	INTO chatrooms(name, owner_uid, private, password)
						VALUES($1, $2, $3, $4);`,
				[]
			);
		}
		else {
			result = dbClient.query(
				`INSERT	INTO chatrooms(name, owner_uid, private)
						VALUES($1, $2, $3);`,
				[]
			);
		}
	}

	update(chat: Chat): void {
//		const result = dbClient.query(
//		);
	}

	delete(id: number, chat_user_id: number): void {
		const result = dbClient.query( // We should manage access to calls to API and delete the IF
			`IF (
				SELECT admin	FROM chatrooms_users
								WHERE id = $1;
			)
				THEN (
					DELETE	FROM chatrooms
							WHERE id = $2;
				)
			END IF;`,
			[id, chat_user_id]
		);
	}
}
