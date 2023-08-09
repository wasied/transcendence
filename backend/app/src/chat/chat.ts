import { User } from '../users/user';

export class Chat {
	id: number;
	name: string;
	owner_uid: number;
	owner: User;
	password: string | null;
	direct_message: boolean;
	participants?: User[];
	participants_id?: number[];
}
