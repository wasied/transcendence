import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameParamsComponent } from "./game-params/game-params.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";

const routes: Routes = [
	{path: '', component: GameParamsComponent, canActivate: [isAuthenticatedGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameParamsRoutingModule {}
