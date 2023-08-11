import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameLobbyComponent } from "./game-lobby/game-lobby.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { GameLobbyGuard } from "src/app/game-lobby-guard.guard";

const routes: Routes = [
	{path: '', component: GameLobbyComponent, canActivate: [isAuthenticatedGuard, GameLobbyGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameLobbyRoutingModule {}
