import { Component, OnInit } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Prodotto } from '../../models/Prodotto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
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
    const tagliaFinal = taglia || '';
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

  aggiornaQuantita(prodottoId: number, quantita: number) {
    this.servizioService.updateQuantita(prodottoId, quantita);
    this.aggiornaCarrello();
  }

  vaiAConsegna() {
    if (this.prodottiCarrello && this.prodottiCarrello.length > 0) {
      // Redirecionar para a página de entrega
      this.router.navigate(['/consegna']);
    } else {

      console.error('O carrinho está vazio!');
    }
  }




  vaiAlPagamento() {
    this.servizioService.vaiAlPagamento(this.timeoutId);
  }




}
