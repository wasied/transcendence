import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './message';
import { dbClient } from '../../db';
import { treatDbResult } from '../../utils/treatDbResult';

@Injectable()
export class MessagesService {
	async findChatroomMessages(user_id: number, chatroom_id: number): Promise<Message[]> {
		const result = dbClient.query(
			`SELECT 
				cm.*, 
				u.profile_picture_url AS author_image_url
			FROM chatrooms_messages AS cm
			JOIN chatrooms_users AS cu ON cm.chatroom_user_uid = cu.id
			JOIN users AS u ON cu.user_uid = u.id
			WHERE 
				cu.chatroom_uid = $1
				AND cu.user_uid NOT IN (
					SELECT blocked_uid
					FROM blocked
					WHERE blocker_uid = $2
				)
			ORDER BY cm.created_at ASC;`,
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
