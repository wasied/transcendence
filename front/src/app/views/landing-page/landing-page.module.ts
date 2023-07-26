import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderLpComponent } from './components/header-lp/header-lp.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';

@NgModule({
  declarations: [
    HeaderLpComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
