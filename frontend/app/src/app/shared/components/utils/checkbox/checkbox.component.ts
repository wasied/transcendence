import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html'
})
export class CheckboxComponent {
	@Output() checkboxChange = new EventEmitter<boolean>();

	onChange(event: Event) {
		const element = event.target as HTMLInputElement;
		this.checkboxChange.emit(element.checked);
	}
}
