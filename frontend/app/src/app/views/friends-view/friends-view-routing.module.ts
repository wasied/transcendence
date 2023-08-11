import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FriendsViewComponent } from "./components/friends-view/friends-view.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";

const routes: Routes = [
	{path: '', component: FriendsViewComponent, canActivate: [isAuthenticatedGuard] }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FriendsViewRoutingModule {}
