import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
