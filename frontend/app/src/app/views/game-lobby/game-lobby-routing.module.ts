import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameLobbyComponent } from "./game-lobby/game-lobby.component";

const routes: Routes = [
	{path: '', component: GameLobbyComponent}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameLobbyRoutingModule {}
