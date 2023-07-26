import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderLpComponent } from './components/header-lp/header-lp.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    HeaderLpComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LandingPageModule { }
