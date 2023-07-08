import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./components/utils/sign-in/sign-in.component";
import { SignUpComponent } from "./components/utils/sign-up/sign-up.component";
import { ChatroomsViewComponent } from "./components/views/chatrooms-view/chatrooms-view.component";
import { DirectMessagesViewComponent } from "./components/views/direct-messages-view/direct-messages-view.component";
import { FriendsViewComponent } from "./components/views/friends-view/friends-view.component";
import { LandingPageComponent } from "./components/views/landing-page/landing-page.component";
import { MainMenuComponent } from "./components/views/main-menu/main-menu.component";
import { ProfileSelfComponent } from "./components/views/profile-self/profile-self.component";

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
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
