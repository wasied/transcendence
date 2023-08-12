import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameViewComponent } from './game-files/game-view/game-view.component';
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { GameLobbyGuard } from "src/app/game-lobby-guard.guard";

const routes: Routes = [
	{path: '', component: GameViewComponent, canActivate: [isAuthenticatedGuard, GameLobbyGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameRoutingModule {}
