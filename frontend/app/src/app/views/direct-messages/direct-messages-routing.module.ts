import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DirectMessagesViewComponent } from "./components/direct-messages-view/direct-messages-view.component";
import { DirectMessageSessionComponent } from "./components/direct-message-session/direct-message-session.component";
import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { hasAccessGuard } from "src/app/has-access-guard.guard";

const routes: Routes = [
	{path: ':id', component: DirectMessageSessionComponent, canActivate: [isAuthenticatedGuard, hasAccessGuard]},
	{path: '', component: DirectMessagesViewComponent, canActivate: [isAuthenticatedGuard]}
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DirectMessagesRoutingModule {}
