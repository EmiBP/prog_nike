import { Component, OnInit } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Router } from '@angular/router';
import { Prodotto } from '../../models/Prodotto';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {

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
    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data.filter(prodotto => prodotto.best_seller >= 4); // Filtra os best sellers
      this.filtraProdotti();
    });
  }

  onItemClick(id: number) {
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
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
      const coloreValido = !this.coloreSelezionato || prodotto.colori_disponibili.includes(this.coloreSelezionato);
      const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

      return prezzoValido && categoriaValida && coloreValido;
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

  get bestSellerCount(): number {
    return this.prodotti.filter(prodotto => prodotto.best_seller >= 4).length; // Contagem de produtos best seller
  }
}
