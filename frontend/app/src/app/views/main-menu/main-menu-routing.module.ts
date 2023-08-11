import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainMenuComponent } from "./main-menu/main-menu.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";

const routes: Routes = [
	{path: '', component: MainMenuComponent, canActivate: [isAuthenticatedGuard] }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainMenuRoutingModule {}
