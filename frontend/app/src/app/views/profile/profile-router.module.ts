import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileSelfComponent } from "./components/profile-self/profile-self.component";
import { ProfileOtherComponent } from "./components/profile-other/profile-other.component";

const routes: Routes = [
	{path: ':id', component: ProfileOtherComponent}, // check this
	{path: '', component: ProfileSelfComponent}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
