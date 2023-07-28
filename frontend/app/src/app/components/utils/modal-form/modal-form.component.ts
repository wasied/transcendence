import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  modal!: FormGroup;

  ngOnInit(): void {
    this.modal = new FormGroup({
      // work in progress
    });
  }
}
