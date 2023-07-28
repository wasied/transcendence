import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";  

const routes: Routes = [
	{path: '', component: LandingPageComponent }
];

@NgModule ({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LandingPageRoutingModule {}
