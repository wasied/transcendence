import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "../models/user.model";

@Injectable ({
	providedIn: 'root'
})
export class UserService {
	// hardcoded for demo purpose
	users: User[] = [
		{
			id: 1,
			username: 'cjulienn',
			password: '12345',
			profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Glock_17-removebg-preview.png',
			phoneNumber: '+524434830186',
			updatedAt: new Date(),
			createdAt: new Date()
		},
		{
			id: 2,
			username: 'opiron',
			password: '123456',
			profileImageURL: 'https://www.nps.gov/articles/000/images/SAMA_2236-11.jpg?maxwidth=1300&autorotate=false&quality=78&format=webp',
			phoneNumber: '+4455667788',
			updatedAt: new Date(),
			createdAt: new Date()
		}
	]

	// return id
	returnNewId() : number {
		let newId: number = 0;
		const users:User[] = this.users;
	
		newId = users.length + 1;
		return newId;
	}

	getUserById(id: number) : User {		
		const userToFind: User | undefined = this.users.find(user => user.id === id);

		if (!userToFind)
			throw console.error('getUserById : user not found'); // temporary
		else
			return userToFind;
	}

	getIdByUser(username: string) : number | undefined {
		for (let user of this.users)
		{
			if (username == user.username)
				return user.id; 
		}
		return undefined;
	}

	fromFormToUser(form: FormGroup) : User {

		let newUser: User = {
			id: this.returnNewId(),
			username: form.get('username')?.value,
			password: form.get('password')?.value,
			profileImageURL: form.get('profileImageURL')?.value,
			phoneNumber: form.get('phoneNumber')?.value,
			createdAt: new Date,
			updatedAt: new Date
		}
		return newUser;
	}
	
	// to work with placeholder, replace by http requests
	addUser(form: FormGroup) : number {
		let user: User = this.fromFormToUser(form);
		
		this.users.push(user);
		return user.id; 
	}

	delUser(id: number) : void {
		this.users = this.users.filter(arr_id => arr_id.id != id);
	}

	// debug only
	displayUsers() : void {
		this.users.forEach((val) => {
			console.log(val);
		});
	}
}
