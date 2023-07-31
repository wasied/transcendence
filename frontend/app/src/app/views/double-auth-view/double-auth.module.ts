import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { DoubleAuthComponent } from './double-auth/double-auth.component';
import { DoubleAuthRoutingModule } from './double-auth-routing.module';

@NgModule({
  declarations: [
	  DoubleAuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
	DoubleAuthRoutingModule
  ]
})
export class DoubleAuthModule { }
