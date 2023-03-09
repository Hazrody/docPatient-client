import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {HomepageComponent} from "./homepage/homepage.component";

import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'homepage', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
