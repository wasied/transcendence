import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { DoubleAuthComponent } from './double-auth/double-auth.component';
import { DoubleAuthRoutingModule } from './double-auth-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
	  DoubleAuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
	DoubleAuthRoutingModule,
	ReactiveFormsModule
  ]
})
export class DoubleAuthModule { }
