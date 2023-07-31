import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameExitComponent } from "./game-exit/game-exit.component";

const routes: Routes = [
	{path: '', component: GameExitComponent}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameExitRoutingModule {}
