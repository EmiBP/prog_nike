import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrls: ['./dettaglio-prodotto.component.css']
})
export class DettaglioProdottoComponent implements OnInit {

  prodotto: any;
  tagliaSelezionata: string | null = null;
  coloreSelezionato: string | null = null;
  erroreTaglia: boolean = false;
  erroreColore: boolean = false;
  mostraCarrello: boolean = false;
  deveRedirecionar: boolean = true;
  timeoutId: any;

  prodottoSelezionato: any;
  quantita: number = 1;

  constructor(private route: ActivatedRoute, private servizioService: ServizioService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.servizioService.getProdottoById(+id).subscribe((data) => {
        this.prodotto = data;
      });
    } else {
      console.error('ID do produto não encontrado');

    };
  }

  selezionaTaglia(taglia: string) {
    console.log('Taglia selecionada:', taglia);
    this.tagliaSelezionata = taglia;
    this.erroreTaglia = false;
  }

  selezionaColore(colore: string) {
    console.log('Colore selecionado:', colore);
    this.coloreSelezionato = colore;
    this.erroreColore = false;
  }

  aggiungiAlCarrello() {
    if (!this.tagliaSelezionata) {
      this.erroreTaglia = true;
      return;
    }

    if (!this.coloreSelezionato) {
      this.erroreColore = true;
      return;
    }

    this.mostraCarrello = true;
    this.deveRedirecionar = true;

    console.log('Aggiunto al carrello', this.prodotto, this.tagliaSelezionata, this.coloreSelezionato);

    const prodottoConDettagli = {
      ...this.prodotto,
      taglia: this.tagliaSelezionata,
      colore: this.coloreSelezionato
    };

    this.servizioService.addProdottoCarrello(prodottoConDettagli, this.quantita);  // Usando a quantidade correta

    setTimeout(() => {
      if (this.deveRedirecionar) {
        this.chiudiCarrello();
      }
    }, 5000);
  }

  chiudiCarrello() {
    this.mostraCarrello = false;
    this.deveRedirecionar = false;
  }

  visualizzaCarrello() {
    this.router.navigate(['/carrello']);
  }

  vaiPagamento() {
    this.router.navigate(['/form-pagamento']);
  }

    vaiAlCarrello() {
      this.servizioService.vaiAlCarrello(this.timeoutId);
    }
}
