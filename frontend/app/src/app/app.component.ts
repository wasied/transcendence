import { Component, HostListener } from '@angular/core';
import { GlobalWebsocketService } from 'src/app/core/services/global-websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Transcendence';

	constructor(private readonly globalWebsocketService: GlobalWebsocketService) {}

	@HostListener('window:unload', ['$event'])
	unloadHandler(event: any) {
		this.globalWebsocketService.updateFriends$.unsubscribe();
		this.globalWebsocketService.disconnect();
	}
}
