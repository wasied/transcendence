import { User } from './user.model';

export class Chatroom {
	public id: number;
	public name: string;
	public owner_uid: number;
	public owner: User;
	public password: string | null;
	public direct_message: boolean;
	public participants: User[];
	public participants_id: number[];
}
