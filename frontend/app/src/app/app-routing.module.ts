import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WhitePageComponent } from "./views/white-page/white-page.component";

import { isAuthenticatedGuard } from './is-authenticated.guard'
import { GameLobbyGuard } from "./game-lobby-guard.guard";
// import { isAuthenticatedGuard } from './is-authenticated.guard'

const routes: Routes = [
	{path: 'auth/redirect', component: WhitePageComponent},
    // lazy loading
	{path: '', loadChildren:
	() => import('./views/landing-page/landing-page.module').then(m => m.LandingPageModule)},
	{path: 'auth/2fa', loadChildren:
	() => import('./views/double-auth-view/double-auth.module').then(m => m.DoubleAuthModule)},
	{path: 'main', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/main-menu/main-menu.module').then(m => m.MainMenuModule)},
	{path: 'main/friends', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/friends-view/friends-view.module').then(m => m.FriendsViewModule)},
	{ path: 'main/profile', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/profile/profile.module').then(m => m.ProfileModule)},
	// game menus
	{ path: 'main/game_params', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/game-params/game-params.module').then(m => m.GameParamsModule)},
	//{ path: 'main/game_lobby', canActivate: [/*isAuthenticatedGuard,*/ GameLobbyGuard], loadChildren:
	{ path: 'main/game_lobby', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/game-lobby/game-lobby.module').then(m => m.GameLobbyModule)},
	{ path: 'main/exit_game', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/game-exit/game-exit.module').then(m => m.GameExitModule)},
	{ path: 'main/game', /*canActivate: [isAuthenticatedGuard]*/ loadChildren:
	() => import('./views/game/game.module').then(m => m.GameModule)},
	// core features of the game (chatroom, pong game, direct messages)
	{path: 'main/chatrooms', /*canActivate: [isAuthenticatedGuard],*/ loadChildren:
	() => import('./views/chat/chat.module').then(m => m.ChatModule)},
	{path: 'main/direct_messages', /*canActivate: [isAuthenticatedGuard],*/ loadChildren: 
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
