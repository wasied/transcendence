import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainMenuRoutingModule } from './main-menu-routing.module';

@NgModule({
	declarations: [
		MainMenuComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MainMenuRoutingModule
	]
})
export class MainMenuModule { }
