import { Component } from '@angular/core';
import { Prodotto } from '../../models/Prodotto';
import { ServizioService } from '../../services/servizio.service';


@Component({
  selector: 'app-home-sliders',
  templateUrl: './home-sliders.component.html',
  styleUrl: './home-sliders.component.css'
})
export class HomeSlidersComponent {
  prodotti: Prodotto[] = [];

  constructor(private servizioService: ServizioService) {
    this.getProdotti()

  }

  getProdotti(): void {
    this.servizioService.getAll().subscribe((prodotti) => (this.prodotti = prodotti));
  }

}
