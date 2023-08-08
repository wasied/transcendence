import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './message';
import { dbClient } from '../../db';
import { treatDbResult } from '../../utils/treatDbResult';

@Injectable()
export class MessagesService {
	async findChatroomMessages(user_id: number, chatroom_id: number): Promise<Message[]> {
		const result = dbClient.query(
			`SELECT *	FROM chatrooms_messages
						WHERE chatroom_user_uid IN (
							SELECT id	FROM chatrooms_users
										WHERE chatroom_uid = $1
						)
						AND chatroom_user_uid NOT IN (
							SELECT id	FROM chatrooms_users
										WHERE user_uid NOT IN (
											SELECT blocked_uid	FROM blocked
																WHERE blocker_uid = $2
										)
						);`,
			[chatroom_id, user_id]
		)
			.then(queryResult => { return treatDbResult(queryResult); })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	send(chatroom_user_uid: number, content: string): void {
		const result = dbClient.query(
			`INSERT	INTO chatrooms_messages(chatroom_user_uid, content)
					VALUES($1, $2);`,
			[chatroom_user_uid, content]
		)
			.then(queryResult => { return queryResult; })
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
}
