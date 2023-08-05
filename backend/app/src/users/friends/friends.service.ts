import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user';
import { dbClient } from '../../db';
import { treatDbResult } from '../../utils/treatDbResult';
import { Friend } from './friend';

@Injectable()
export class FriendsService {
	async findAll(user_id): Promise<User[]> {
		const result = await dbClient.query(
			`SELECT *	FROM friends
						WHERE user_uid1 = $1;`,
			[user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	async findOne(friendship_id: number): Promise<Friend[]> {
		const result = await dbClient.query(
			`SELECT *	FROM friends
						WHERE id = $1;`,
			[friendship_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return result;
	}

	create(user_uid1: number, user_uid2: number): void {
		const result = dbClient.query(
			`INSERT	INTO friends(user_uid1, user_uid2)
					VALUES($1, $2);`,
			[user_uid1, user_uid2]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}

	delete(user_id: number, friendship_id: number): void {
		const result = dbClient.query(
			`IF EXISTS (
				SELECT *	FROM friends
							WHERE id = $1
							AND user_uid1 = $2
			)
				DELETE	FROM friends
						WHERE id = $1;
			END IF;`,
			[friendship_id, user_id]
		)
		.then(queryResult => { return treatDbResult(queryResult); })
		.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
	}
}
