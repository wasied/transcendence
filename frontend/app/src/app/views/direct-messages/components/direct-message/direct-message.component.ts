import { Component, Input, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectMessage } from 'src/app/core/models/direct-message.model'; 
import tippy from 'tippy.js';

@Component({
	selector: 'app-direct-message',
	templateUrl: './direct-message.component.html',
	styleUrls: ['./direct-message.component.css'],
	encapsulation: ViewEncapsulation.None,  // Needed to apply tooltip CSS
})
export class DirectMessageComponent implements AfterViewInit {

	@Input() directMessage!: DirectMessage;
	
	constructor(private router: Router, private elementRef: ElementRef) {}

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

	blockDMSession() : void {
		console.log('feature not implemented yet !');
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
