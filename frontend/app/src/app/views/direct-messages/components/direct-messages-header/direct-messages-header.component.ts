import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service';
import { DirectMessage } from 'src/app/core/models/direct-message.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-direct-messages-header',
	templateUrl: './direct-messages-header.component.html',
	styleUrls: ['./direct-messages-header.component.css']
})
export class DirectMessagesHeaderComponent implements OnInit {
	
	participants$!: Observable<DirectMessage>;
	
	constructor (private router: Router,
				 private dmService: DirectMessagesService,
				 private route: ActivatedRoute) {};

	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');
		
		if (id) {
			this.participants$ = this.dmService.getHardcodedDirectMessageById(+id);
		}
		else
			; // raise error there
	}
	
	onQuitDMSession() : void {
		this.router.navigate(['main/direct_messages']);
	}
}
