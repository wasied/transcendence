import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
	@Input() showModal: boolean = false;
	@Output() onClose = new EventEmitter();
	@Output() onAction = new EventEmitter<void>();

	ngOnInit() : void {
		this.onClose.subscribe(() => {
			console.log('onClose event emitted...');
		});
	}
	
	closeModal() : void {
		this.onClose.emit();
	}

	triggerActionThenClose() : void {
		this.onAction.emit();
		this.closeModal();
	}
}
