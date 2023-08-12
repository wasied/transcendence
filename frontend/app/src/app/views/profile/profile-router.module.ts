import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileSelfComponent } from "./components/profile-self/profile-self.component";
import { ProfileOtherComponent } from "./components/profile-other/profile-other.component";
import { MatchHistoryViewComponent } from "./components/match-history-view/match-history-view.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { hasAccessGuard } from "src/app/has-access-guard.guard";

const routes: Routes = [
	{path: 'match_history/:id', component: MatchHistoryViewComponent, canActivate: [isAuthenticatedGuard, hasAccessGuard]},
	{path: 'match_history', component: MatchHistoryViewComponent, canActivate: [isAuthenticatedGuard]},
	{path: ':id', component: ProfileOtherComponent, canActivate: [isAuthenticatedGuard, /*hasAccessGuard*/]},
	{path: '', component: ProfileSelfComponent, canActivate: [isAuthenticatedGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
