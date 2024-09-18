import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { PrevDirective } from './components/home-sliders/prev.directive';
import { NextDirective } from './components/home-sliders/next.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSlidersComponent } from './components/home-sliders/home-sliders.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { DettaglioProdottoComponent } from './components/dettaglio-prodotto/dettaglio-prodotto.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { ConsengaComponent } from './components/consenga/consenga.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { SportComponent } from './components/sport/sport.component';
import { FormPagamentoComponent } from './components/form-pagamento/form-pagamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrevDirective,
    NextDirective,
    FooterComponent,
    HomeSlidersComponent,
    NewArrivalsComponent,
    BannerHomeComponent,
    DettaglioProdottoComponent,
    HeaderSearchComponent,
    CarrelloComponent,
    ConsengaComponent,
    ProdottiComponent,
    SportComponent,
    FormPagamentoComponent,


  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
