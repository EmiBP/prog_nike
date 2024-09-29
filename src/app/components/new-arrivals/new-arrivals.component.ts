import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/Prodotto';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {
  prodotti: Prodotto[] = [];
  prodottiFiltrati: Prodotto[] = [];
  prodottiVisualizzati: Prodotto[] = [];
  prodottiPerPagina: number = 6;
  paginaCorrente: number = 1;

  categorie: string[] = ['Sneakers', 'Running', 'Casual', 'Sport'];
  colori: string[] = ['Nero', 'Bianco', 'Grigio', 'Blu', 'Rosso'];

  categoriaSelezionata: string | null = null;
  coloreSelezionato: string | null = null;
  prezzoFiltro: number = 500;

  constructor(private servizioService: ServizioService, private router: Router) {}

  ngOnInit(): void {
    this.carregarNovosProdutos();
  }

  carregarNovosProdutos(): void {
    this.servizioService.getNovosProdutos().subscribe((response: any) => {
      this.prodotti = response;
      this.filtraProdotti();
    });
  }

  caricaProdotti(): void {
    const inizio = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    const fine = this.paginaCorrente * this.prodottiPerPagina;
    this.prodottiVisualizzati = this.prodottiFiltrati.slice(inizio, fine);
  }

  caricaAltriProdotti(): void {
    this.paginaCorrente++;
    this.caricaProdotti();
  }

  selezionaCategoria(categoria: string): void {
    this.categoriaSelezionata = categoria;
    this.paginaCorrente = 1;
    this.filtraProdotti();
  }

  selezionaColore(colore: string): void {
    this.coloreSelezionato = colore;
    this.paginaCorrente = 1;
    this.filtraProdotti();
  }

  filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti.filter(prodotto => {
      const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;
      const coloreValido = !this.coloreSelezionato ||
                           (Array.isArray(prodotto.colori_disponibili) && prodotto.colori_disponibili.includes(this.coloreSelezionato));
      const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

      return prezzoValido && (!this.categoriaSelezionata || categoriaValida) && (!this.coloreSelezionato || coloreValido);
    });

    this.caricaProdotti();
  }

  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.coloreSelezionato = null;
    this.prezzoFiltro = 500;
    this.paginaCorrente = 1;
    this.filtraProdotti();
  }


  onItemClick(id: number) {
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
  }

}
