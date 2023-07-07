import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "../models/user.model";
import { Observable, map, switchMap } from "rxjs";

@Injectable ({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) {};

	private apiURL: string = 'http://localhost:3000/users'; // change that in final product
	private currentUserId: number = -1;
	
	// return new id as an observable (TO BE LATER HANDLED BY BACK END)
	returnNewId() : Observable<number> {
		return this.getAllUsers().pipe(
			map(users => {
				const maxId = Math.max(...users.map(user => user.id));
				const newId = maxId + 1;
				return newId;
			})
		);
	}

	getAllUsers() : Observable<User[]> {
		return this.http.get<User[]>(`${this.apiURL}`);
	}

	getUsersInActiveSession() : Observable<User[]> {
		return this.http.get<User[]>(`${this.apiURL}/active`);
	}

	getUserById(id: number) : Observable<User> {				
		return this.http.get<User>(`${this.apiURL}/${id}`);
	}

	getUserByUsername(username: string) : Observable<User> {
		return this.http.get<User>(`${this.apiURL}?username=${username}`);
	}
	
	addNewUser(form: FormGroup) : Observable<User> {
		// add variables from the form
		const username: string = form.get('username')?.value;
		const password: string = form.get('password')?.value;
		const profileImageURL: string = form.get('profileImageURL')?.value;
		const phoneNumber: string = form.get('phoneNumber')?.value;

		return this.returnNewId().pipe(
			switchMap(newId => {
				const newUser: User = {
					id : newId,
					username: username,
					password: password,
					profileImageURL: profileImageURL,
					phoneNumber: phoneNumber,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return this.http.post<User>(this.apiURL, newUser);
			})
		);	
	}

	deleteUser(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}

	// use a partial user to be more DRY (can updated every fields or just some)
	modifyUser(id: number, partialUser: Partial<User>) : Observable<User> {
		return this.http.put<User>(`${this.apiURL}/${id}`, partialUser);
	}
	
	storeUserId(id: number) : void {
		this.currentUserId = id;
	}

	delUserId(id: number) : void {
		this.currentUserId = -1;
	}

	getUserId() : number {
		return this.currentUserId;
	}


}
