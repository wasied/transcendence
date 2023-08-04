import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FriendsViewComponent } from "./components/friends-view/friends-view.component"; 

const routes: Routes = [
	{path: '', component: FriendsViewComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FriendsViewRoutingModule {}
