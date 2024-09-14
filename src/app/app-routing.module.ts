import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSlidersComponent } from './components/home-sliders/home-sliders.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { DettaglioProdottoComponent } from './components/dettaglio-prodotto/dettaglio-prodotto.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { SportComponent } from './components/sport/sport.component';
const routes: Routes = [

 {path: '', component: HomeSlidersComponent},
 {path: '', component: BannerHomeComponent},
 {path: 'nuovi-arrivi', component: NewArrivalsComponent},
 { path: 'dettaglio-prodotto/:id', component: DettaglioProdottoComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: HeaderSearchComponent },
  { path: 'carrello', component: CarrelloComponent },
  { path: 'tutti-prodotti', component: ProdottiComponent },
  { path: 'sport/:categoria', component: SportComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
