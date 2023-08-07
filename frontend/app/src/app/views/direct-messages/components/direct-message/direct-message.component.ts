import { Component, Input,Output, EventEmitter, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectMessage } from 'src/app/core/models/direct-message.model'; 
import tippy from 'tippy.js';
import { UsersService } from '../../../../core/services/users.service';

@Component({
	selector: 'app-direct-message',
	templateUrl: './direct-message.component.html',
	styleUrls: ['./direct-message.component.css'],
	encapsulation: ViewEncapsulation.None,  // Needed to apply tooltip CSS
})
export class DirectMessageComponent implements AfterViewInit {

	@Input() directMessage!: DirectMessage;
	@Output() messageRemoved = new EventEmitter<number>();
	
	constructor(private router: Router, 
				private elementRef: ElementRef,
				private usersService: UsersService) {}

	ngAfterViewInit() : void {
		// Button Tooltip
		this.initializeTooltips()
	}

	goToDMSession(dmId: number) : void {
		this.router.navigate(['main/direct_messages', dmId]);
	}

	rmDMSession() : void {
		console.log('feature not implemented yet !');
	}

	blockUserFromDMSession() : void {
		//this.usersService.blockUser(this.directMessage.otherPlayerId);
	}

	initializeTooltips() {
		tippy(this.elementRef.nativeElement.querySelector('#block'), {
			content: 'Block user',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
		tippy(this.elementRef.nativeElement.querySelector('#delete'), {
			content: 'Delete this contact',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
	}
}
