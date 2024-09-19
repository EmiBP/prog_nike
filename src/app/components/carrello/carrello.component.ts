import { Component, OnInit } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Prodotto } from '../../models/Prodotto';
import { Router } from '@angular/router';

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
  timeoutId: any;
  constructor(private servizioService: ServizioService, private router: Router) {}

  ngOnInit() {
    this.servizioService.getCarrelloObservable().subscribe(carrello => {
      this.prodottiCarrello = carrello;
      console.log('Carrello aggiornato:', this.prodottiCarrello);
    });
  }




  removeItem(prodottoId: number, taglia?: string, colore?: string) {
    const tagliaFinal = taglia || '';  // Se taglia for undefined, usa string vazia
    const coloreFinal = colore || '';

    this.servizioService.removeProdottoCarrello(prodottoId, tagliaFinal, coloreFinal);
  }

  calcolaSubtotale(): number {
    return this.prodottiCarrello.reduce((acc, item) => acc + item.prodotto.prezzo * item.quantita, 0);
  }

  calcolaTotale(): number {
    return this.calcolaSubtotale();
  }

  aggiornaCarrello() {
    this.servizioService.setProdottoCarrello(this.prodottiCarrello);
  }
  vaiAConsegna() {
    this.servizioService.vaiAConsegna(this.timeoutId);
  }

  vaiAlPagamento() {
    this.servizioService.vaiAlPagamento(this.timeoutId);
  }




}
