import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FriendsViewComponent } from './friends-view/friends-view.component';
import { FriendsViewRoutingModule } from './friends-view-routing.module';

@NgModule({
  declarations: [
    FriendsViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FriendsViewRoutingModule
  ]
})
export class FriendsViewModule { }
