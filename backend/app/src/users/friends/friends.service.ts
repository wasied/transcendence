import { Injectable } from '@nestjs/common';
import { Users } from '../users';

@Injectable()
export class FriendsService {
	findAll(user_id): Users {
		const result = client.query(
			"SELECT *	FROM friends	\
						WHERE user_uid1 = $1;",
			[user_id]
		);

		return result;
	}

	whoIsOnline(user_id): Users {
		const result = client.query(
			"SELECT *	FROM friends	\
						WHERE user_uid1 = $1;",
			{streams: {"online": socket}} // Add socket
		);

		return result;
	}

	create(user_uid1: number, user_uid2: number): void {
		const result = client.query(
			"INSERT	INTO friends(user_uid1, user_uid2)	\
					VALUES($1, $2);",
			[user_uid1, user_uid2]
		);
	}

	delete(friendship_id: number): void {
		const result = client.query(
			"DELETE	FROM friends	\
					WHERE id = $1;",
			[friendship_id]
		);
	}
}
