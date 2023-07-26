import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignInComponent } from "./shared/components/utils/sign-in/sign-in.component";
import { SignUpComponent } from "./shared/components/utils/sign-up/sign-up.component";

import { MainMenuComponent } from "./views/main-menu/main-menu/main-menu.component";
import { LandingPageComponent } from "./views/landing-page/components/landing-page/landing-page.component";

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'main', component: MainMenuComponent},
	{path: 'signup', component: SignUpComponent}, // try to do it with a modal
	{path: 'signin', component:SignInComponent}, // try to do it with a modal
	// child routing modules
	{path: 'main/friends', loadChildren:
	() => import('./views/friends-view/friends-view-routing.module').then(m => m.FriendsViewRoutingModule)},
	{ path: 'main/games', loadChildren:
	() => import('./views/games-view/games-view-routing.module').then(m => m.GamesViewRoutingModule)},
	{ path: 'main/match_history', loadChildren:
	() => import('./views/match-history-view/match-history-routing.module').then(m => m.MatchHistoryRoutingModule)},
	{ path: 'main/profile', loadChildren:
	() => import('./views/profile/profile-router.module').then(m => m.ProfileRoutingModule)},
	// core features of the game (chatroom, pong game, direct messages)
	{path: 'main/chatrooms', loadChildren:
	() => import('./views/chat/chat-routing.module').then(m => m.ChatRoutingModule)},
	{path: 'main/direct_messages', loadChildren: 
	() => import('./views/direct-messages/direct-messages-routing.module').then(m => m.DirectMessagesRoutingModule)}
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
