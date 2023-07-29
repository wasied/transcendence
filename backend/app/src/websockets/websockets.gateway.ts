import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ port: process.env.WEBSOCKET_PORT })
export class WebsocketsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
