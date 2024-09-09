import { Component } from '@angular/core';
import { Prodotto } from '../../models/Prodotto';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent {
  prodotti: Prodotto[] = [];

  constructor(private servizioService: ServizioService) {

  }

  ngOnInit(): void {
    this.carregarNovosProdutos();
  }

  carregarNovosProdutos() {
    this.servizioService.getNovosProdutos().subscribe((response: any) => {
      this.prodotti = response;
    });
  }

}
