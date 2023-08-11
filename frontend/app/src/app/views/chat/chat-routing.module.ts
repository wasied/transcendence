import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatroomSessionComponent } from "./components/chatroom-session/chatroom-session.component";

import { ChatroomsViewComponent } from "./components/chatrooms-view/chatrooms-view.component";

import { isAuthenticatedGuard } from "src/app/is-authenticated.guard";
import { hasAccessGuard } from "src/app/has-access-guard.guard";

const routes: Routes = [
	{ path: ':id', component: ChatroomSessionComponent, canActivate: [isAuthenticatedGuard, hasAccessGuard] },
	{ path: '', component: ChatroomsViewComponent, canActivate: [isAuthenticatedGuard] } // add paths for chatrooms
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoutingModule {}
