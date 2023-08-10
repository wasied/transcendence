import { Injectable } from '@angular/core';

@Injectable({
  	providedIn: 'root'
})
export class AccessControlService {
  	private hasAccess: boolean = false;

  	setAccess(hasAccess: boolean): void {
    	this.hasAccess = hasAccess;
  	}

  	getAccess(): boolean {
    	return this.hasAccess;
  	}
}
