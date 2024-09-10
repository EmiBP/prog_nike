import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { PrevDirective } from './prev.directive';
import { NextDirective } from './next.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSlidersComponent } from './components/home-sliders/home-sliders.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';

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
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
