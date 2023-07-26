import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, map, switchMap, of } from "rxjs";
import { DirectMessage } from "../models/direct-message.model"; 

@Injectable({
	providedIn: 'root'
})
export class DirectMessagesSevice {

	constructor (private http: HttpClient) {};

	private hardcodedDirectMessages: DirectMessage[] = [{
		id: 1,
		otherPlayerId: 1,
		otherPlayerPseudo: 'test other player',
		otherPlayerStatus: 'online'
	}];

	gethardcodedDirectMessages() : Observable<DirectMessage[]> {
		return of(this.hardcodedDirectMessages);
	}



	// with observables

	private apiURL : string = 'http://localhost:3000/chatrooms_messages'; // add that

	// addNewDirectMsg(form : FormGroup) : Observable<DirectMessage> {
		
	// 	const otherPlayerId: string = form.get('otherPlayerId')?.value;
	// 	const otherPlayerPseudo: string = form.get('otherPlayerPseudo')?.value;
	// 	const otherPlayerStatus: string = form.get('otherPlayerStatus')?.value;

	// 	return this.returnNewId().pipe(
	// 		switchMap(newId => {
	// 			const newDirectMsg: DirectMessage = {
	// 				id: ,
	// 				otherPlayerId: ,
	// 				otherPlayerPseudo: ,
	// 				otherPlayerStatus: 
	// 			};
	// 			return this.http.post<DirectMessage>();
	// 		})
	// 	);
	// }
	
	getDirectMsgById(id : number) : Observable<DirectMessage> {
		return this.http.get<DirectMessage>(`${this.apiURL}/${id}`);
	}

	getAllDirectMsgs() : Observable<DirectMessage[]> {
		return this.http.get<DirectMessage[]>(`${this.apiURL}`);
	}

	delDirectMsg(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}
}
