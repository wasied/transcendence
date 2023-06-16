import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/views/landing-page/landing-page.component";
import { MainMenuComponent } from "./components/views/main-menu/main-menu.component";

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'main', component: MainMenuComponent}
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
