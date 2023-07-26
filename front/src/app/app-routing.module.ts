import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{path: '', loadChildren:
	() => import('./views/landing-page/landing-page.module').then(m => m.LandingPageModule)},
	{path: 'main', loadChildren:
	() => import('./views/main-menu/main-menu.module').then(m => m.MainMenuModule)},
	// child routing modules
	{path: 'main/friends', loadChildren:
	() => import('./views/friends-view/friends-view.module').then(m => m.FriendsViewModule)},
	{ path: 'main/games', loadChildren:
	() => import('./views/games-view/games-view.module').then(m => m.GamesViewModule)},
	{ path: 'main/match_history', loadChildren:
	() => import('./views/match-history-view/match-history-view.module').then(m => m.MatchHistoryViewModule)},
	{ path: 'main/profile', loadChildren:
	() => import('./views/profile/profile.module').then(m => m.ProfileModule)},
	// core features of the game (chatroom, pong game, direct messages)
	{path: 'main/chatrooms', loadChildren:
	() => import('./views/chat/chat.module').then(m => m.ChatModule)},
	{path: 'main/direct_messages', loadChildren: 
	() => import('./views/direct-messages/direct-messages.module').then(m => m.DirectMessagesModule)}
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
