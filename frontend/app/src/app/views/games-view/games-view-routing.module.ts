import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GamesViewComponent } from "./games-view/games-view.component";

const routes: Routes = [
	{path: '', component: GamesViewComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GamesViewRoutingModule {}
