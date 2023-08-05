export class User {
	readonly id: number;
	readonly username: string;
	status: string;
	a2f_key: string; // a2f_key might be readonly
	profile_picture_url: string;
	readonly updated_at: string;
	readonly created_at: string;
	owner?: number[];
	admin?: number[];
}
