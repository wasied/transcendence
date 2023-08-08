export class Chatroom {
	public id: number;
	public name: string;
	public owner_uid: number;
	public owner?: string;
	public password: string | null;
	public participants: string[];
	public participants_id?: number[];
}
