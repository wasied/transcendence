import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatroomSessionComponent } from "./components/chatroom-session/chatroom-session.component";

import { ChatroomsViewComponent } from "./components/chatrooms-view/chatrooms-view.component";

const routes: Routes = [
	{ path: ':id', component: ChatroomSessionComponent },
	{ path: '', component: ChatroomsViewComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChatRoutingModule {}
