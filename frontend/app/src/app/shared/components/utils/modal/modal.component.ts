import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent {
	@Input() showModal: boolean = false;
	@Output() onClose = new EventEmitter();

	closeModal() {
		this.onClose.emit();
	}
}
