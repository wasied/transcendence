import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainMenuModule } from "./views/main-menu/main-menu.module";

import { ChatroomsViewComponent } from "./views/chat/components/chatrooms-view/chatrooms-view.component";
import { DirectMessagesViewComponent } from "./views/direct-messages/components/direct-messages-view/direct-messages-view.component";
import { FriendsViewComponent } from "./views/friends-view/friends-view/friends-view.component";
import { LandingPageComponent } from "./views/landing-page/components/landing-page/landing-page.component";
import { ProfileSelfComponent } from "./views/profile-self/components/profile-self/profile-self.component";
import { MainMenuComponent } from "./views/main-menu/main-menu/main-menu.component";
import { SignInComponent } from "./shared/components/utils/sign-in/sign-in.component";
import { SignUpComponent } from "./shared/components/utils/sign-up/sign-up.component";

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'main', component: MainMenuComponent},
	{path: 'signup', component: SignUpComponent},
	{path: 'signin', component:SignInComponent},
	{path: 'main/chatrooms', component:ChatroomsViewComponent},
	{path: 'main/direct_messages', component:DirectMessagesViewComponent},
	{path: 'main/friends', component:FriendsViewComponent},
	{path: 'main/profile', component:ProfileSelfComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		MainMenuModule
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
