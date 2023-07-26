import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoSecurityComponent } from './components/info-security/info-security.component';
import { ProfileSelfComponent } from './components/profile-self/profile-self.component';

@NgModule({
  declarations: [
    InfoSecurityComponent,
    ProfileSelfComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileSelfModule { }
