import { Component, OnInit } from '@angular/core';
// import { WebsocketService } from './websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Transcendence';
	
	// constructor(private wsService: WebsocketService) {}

	// ngOnInit() {
	//   this.wsService.sendMessage('Hello world');
	// }
}
