import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable ({
	providedIn: 'root'
})
export class UserService {

	// hardcoded for demo purpose
	users: User[] = [
		{
			id:1,
			username: 'cjulienn',
			password: '12345',
			profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Glock_17-removebg-preview.png',
			phoneNumber: '+524434830186',
			updatedAt: new Date(),
			createdAt: new Date()
		},
		{
			id:2,
			username: 'opiron',
			password: '123456',
			profileImageURL: 'https://www.nps.gov/articles/000/images/SAMA_2236-11.jpg?maxwidth=1300&autorotate=false&quality=78&format=webp',
			phoneNumber: '+4455667788',
			updatedAt: new Date(),
			createdAt: new Date()
		}
	]
}
