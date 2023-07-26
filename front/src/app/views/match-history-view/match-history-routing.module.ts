import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MatchHistoryViewComponent } from "./match-history-view/match-history-view.component"; 

const routes: Routes = [
	{path: '', component: MatchHistoryViewComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MatchHistoryRoutingModule {}
