import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameExitComponent } from "./game-exit/game-exit.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { GameLobbyGuard } from "src/app/game-lobby-guard.guard";

const routes: Routes = [
	//{path: '', component: GameExitComponent, canActivate: [isAuthenticatedGuard, GameLobbyGuard]}
	{path: ':id', component: GameExitComponent, canActivate: [isAuthenticatedGuard, GameLobbyGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameExitRoutingModule {}
