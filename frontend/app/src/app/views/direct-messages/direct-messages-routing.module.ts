import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DirectMessagesViewComponent } from "./components/direct-messages-view/direct-messages-view.component";

const routes: Routes = [
	{path: '', component: DirectMessagesViewComponent } // add paths for direct messages
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DirectMessagesRoutingModule {}
