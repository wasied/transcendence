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

import { AuthHttpClient } from './auth-http-client';

import { AccessControlService } from './core/services/access-control.service';
import { NotFoundModule } from './views/not-found/not-found.module';
import { NotFoundComponent } from './views/not-found/not-found/not-found.component';

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
		SharedModule,
		NotFoundModule
	],
	providers: [AuthHttpClient, AccessControlService],
	bootstrap: [AppComponent]
})
export class AppModule { }
