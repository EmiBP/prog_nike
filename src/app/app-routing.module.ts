import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSlidersComponent } from './components/home-sliders/home-sliders.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
const routes: Routes = [

 {path: '', component: HomeSlidersComponent},
 {path: '', component: BannerHomeComponent},
 {path: 'nuovi-arrivi', component: NewArrivalsComponent},


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
