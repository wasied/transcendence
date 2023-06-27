import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./components/utils/sign-up/sign-up.component";
import { LandingPageComponent } from "./components/views/landing-page/landing-page.component";
import { MainMenuComponent } from "./components/views/main-menu/main-menu.component";

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'main/:id', component: MainMenuComponent},
	{path: 'signup', component: SignUpComponent}
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
