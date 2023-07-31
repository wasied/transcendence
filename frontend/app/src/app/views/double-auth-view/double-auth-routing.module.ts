import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DoubleAuthComponent } from "./double-auth/double-auth.component";


const routes: Routes = [
	{path: '', component: DoubleAuthComponent}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DoubleAuthRoutingModule {}
