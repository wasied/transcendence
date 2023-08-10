// import { Injectable } from '@angular/core';
// import { Socket, io } from 'socket.io-client';
// import { Observable } from 'rxjs';
// import { AuthenticationService } from './authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class MessagesWebsocketService {
// 	private socket: Socket;

// 	constructor(private readonly authService: AuthenticationService) {
// 		const options = {
// 			transportOptions: {
// 				polling: {
// 					extraHeaders: {
// 						Authorization: `Bearer ${this.authService.getTokenOnLocalSession()}`
// 					}
// 				}
// 			}
// 		};
// 		this.socket = io('http://localhost:8080/messages', options);
// 	}

// 	// Listen for channel messages
// 	getMessages(): Observable<any> {
// 		return new Observable(observer => {
// 			this.socket.on('updateMessages', (data: any) => {
// 				observer.next(data);
// 			});
// 		});
// 	}

// 	// Send a new message to the chatroom
// 	sendMessage(roomId: number, message: string): void {
// 		this.socket.emit('newMessage', {
// 			chatroom_id: roomId,
// 			content: message
// 		});
// 	}
// }
