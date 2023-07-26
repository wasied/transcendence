export class User {
	constructor (public id: number,
				 public username: string,
				 public password: string,
				 public profileImageURL: string,
				 public phoneNumber: string,
				 public updatedAt: Date,
				 public createdAt: Date) {}
}
