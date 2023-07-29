import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  ws: WebSocket;

  constructor(private envService: EnvironmentService) {
    this.ws = new WebSocket(`ws://backend:${this.envService.get('WEBSOCKET_PORT')}`);
  }

  sendMessage(msg: string) {
    this.ws.send(msg);
  }
}
