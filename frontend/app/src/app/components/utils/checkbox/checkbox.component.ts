import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  form!: FormGroup;
  
  ngOnInit() : void {
    this.form = new FormGroup({
      myCheckbox: new FormControl(false)
    });
  }

  // add code that will enable two factor authentication there
  onClickingOnCheckbox() : void {

  }
}
