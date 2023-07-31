import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WhitePageComponent } from './views/white-page/white-page.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
    	WhitePageComponent,
	],
	imports: [
    	BrowserModule,
    	AppRoutingModule,
    	ReactiveFormsModule,
    	BrowserAnimationsModule,
    	MatDialogModule,
    	HttpClientModule,
    	CoreModule,
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
