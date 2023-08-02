import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-custom-button',
	templateUrl: './custom-button.component.html',
	styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {
	
	@Input() title: string = 'Button';
	@Output() onClick: EventEmitter<void> = new EventEmitter<void>();

	handleClick() : void {
    	this.onClick.emit();
  	}
}
