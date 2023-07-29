import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GameParamsComponent } from "./game-params/game-params.component";

const routes: Routes = [
	{path: '', component: GameParamsComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GameParamsRoutingModule {}
