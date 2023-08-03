import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DirectMessagesViewComponent } from "./components/direct-messages-view/direct-messages-view.component";
import { DirectMessageSessionComponent } from "./components/direct-message-session/direct-message-session.component";

const routes: Routes = [
	{path: ':id', component: DirectMessageSessionComponent},
	{path: '', component: DirectMessagesViewComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DirectMessagesRoutingModule {}
