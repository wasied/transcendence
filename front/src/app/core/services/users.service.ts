import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "../models/user.model"; 
import { Observable, of, map, switchMap } from "rxjs";

@Injectable ({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) {};

	private apiURL: string = 'http://localhost:3000/users'; // change that in final product
	private currentUserId: number = -1; // change this

	private harcodedUsers: User[]  = [{
		id: 1,
		username: 'testUser',
		password: '123456',
		profileImageURL: '/Users/corentin/code/19/transcendence/front/src/assets/imgs/picture-profile-empty.jpg',
		phoneNumber: '0987654321',
		updatedAt: new Date(),
		createdAt: new Date()
	}];

	getHardcodedUsers() : Observable<User[]> {
		return of(this.harcodedUsers);
	}

	// with observables
	
	getAllUsers() : Observable<User[]> {
		return this.http.get<User[]>(`${this.apiURL}`);
	}

	getUserById(id: number) : Observable<User> {
		return this.http.get<User>(`${this.apiURL}/${id}`);
	}

	// should be used for displaying 
	getUsersInActiveSession() : Observable<User[]> {
		return this.http.get<User[]>(`${this.apiURL}/active`);
	}

	// should be used to display game history
	getUsersHavingPlayedWithGivenUser(userId: number) : Observable<User[]> {
		return this.http.get<User[]>(`${this.apiURL}`); // change url of course
	}

	getUserByUsername(username: string) : Observable<User> {
		return this.http.get<User>(`${this.apiURL}?username=${username}`);
	}
	
	// addNewUser(form: FormGroup) : Observable<User> {
	// 	// add variables from the form
	// 	const username: string = form.get('username')?.value;
	// 	const password: string = form.get('password')?.value;
	// 	const profileImageURL: string = form.get('profileImageURL')?.value;
	// 	const phoneNumber: string = form.get('phoneNumber')?.value;

	// 	return this.returnNewId().pipe(
	// 		switchMap(newId => {
	// 			const newUser: User = {
	// 				id : newId,
	// 				username: username,
	// 				password: password,
	// 				profileImageURL: profileImageURL,
	// 				phoneNumber: phoneNumber,
	// 				createdAt: new Date(),
	// 				updatedAt: new Date()
	// 			};
	// 			return this.http.post<User>(this.apiURL, newUser);
	// 		})
	// 	);	
	// } 
 
	deleteUser(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}

	// use a partial user to be more DRY (can updated every fields or just some)
	modifyUser(id: number, partialUser: Partial<User>) : Observable<User> {
		return this.http.put<User>(`${this.apiURL}/${id}`, partialUser);
	}
	
	storeUserId(id: number) : void {		
		if (id != -1)
			throw console.error('there is already a user id that is store for this session');
		this.currentUserId = id;
	}

	delUserId(id: number) : void {
		this.currentUserId = -1;
	}

	getCurrentUserId() : number {
		return this.currentUserId;
	}
}
