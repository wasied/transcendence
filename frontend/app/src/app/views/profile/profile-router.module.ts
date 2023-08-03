import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileSelfComponent } from "./components/profile-self/profile-self.component";
import { ProfileOtherComponent } from "./components/profile-other/profile-other.component";
import { MatchHistoryViewComponent } from "./components/match-history-view/match-history-view.component";

const routes: Routes = [
	{path: 'match_history/:id', component: MatchHistoryViewComponent},
	{path: 'match_history', component: MatchHistoryViewComponent},
	{path: ':id', component: ProfileOtherComponent},
	{path: '', component: ProfileSelfComponent}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
