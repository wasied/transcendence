import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'menu', component: MainMenuComponent}
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
