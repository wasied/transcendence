import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(`ws://backend:${environment.websocketPort}`);
  }

  sendMessage(msg: string) {
    this.ws.send(msg);
  }
}
