import { Component, OnInit } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Prodotto } from '../../models/Prodotto';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']  // Corrigido de 'styleUrl' para 'styleUrls'
})
export class CarrelloComponent implements OnInit {
  prodottiCarrello: { prodotto: Prodotto; quantita: number }[] = [];
  tagliaSelezionata: string = '';
  coloreSelezionato: string | null = null;
prodotto: any;

  constructor(private servizioService: ServizioService) {}

  ngOnInit() {
    const carrelloData = this.servizioService.getProdottoCarrello();

    if (carrelloData) {
      this.prodottiCarrello = carrelloData;

      if (this.prodottiCarrello.length > 0) {
        this.tagliaSelezionata = this.prodottiCarrello[0].prodotto.taglia || '';
        this.coloreSelezionato = this.prodottiCarrello[0].prodotto.colore || null;
      }
    }
  }
}
