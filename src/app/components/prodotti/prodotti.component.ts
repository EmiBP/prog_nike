import { Component, OnInit } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent implements OnInit {
  prodotti: any[] = [];
  prodottiFiltrati: any[] = [];
  prodottiVisualizzati: any[] = [];
  prodottiPerPagina: number = 6;
  paginaCorrente: number = 1;

  categorie: string[] = ['Sneakers', 'Running', 'Casual', 'Sport'];
  colori: string[] = ['Nero', 'Bianco', 'Grigio', 'Blu', 'Rosso'];

  categoriaSelezionata: string | null = null;
  coloreSelezionato: string | null = null;
  prezzoFiltro: number = 500;

  constructor(private servizioService: ServizioService, private router: Router) {}

  ngOnInit(): void {
    this.loadProdotti();
  }

  private loadProdotti(): void {
    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data;
      this.filtraProdotti();
    });
  }



  onItemClick(id: number): void {
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
  }

  private caricaProdotti(): void {
    const inizio = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    const fine = this.paginaCorrente * this.prodottiPerPagina;
    this.prodottiVisualizzati = this.prodottiFiltrati.slice(inizio, fine);
  }

  caricaAltriProdotti(): void {
    this.paginaCorrente++;
    this.caricaProdotti();
    if (this.prodottiFiltrati.length > this.paginaCorrente * this.prodottiPerPagina) {
      this.caricaProdotti();
    } else {
      console.log('Não há mais produtos para carregar.');
    }
  }

  selezionaCategoria(categoria: string): void {
    this.categoriaSelezionata = categoria;
    this.resetPagina();
    this.filtraProdotti();
  }

  selezionaColore(colore: string): void {
    this.coloreSelezionato = colore;
    this.resetPagina();
    this.filtraProdotti();
  }

  public filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti.filter(prodotto => {
      const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;
      const coloreValido = !this.coloreSelezionato || prodotto.colori_disponibili.includes(this.coloreSelezionato);
      const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

      return categoriaValida && coloreValido && prezzoValido;
    });

    this.caricaProdotti();
  }

  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.coloreSelezionato = null;
    this.prezzoFiltro = 500;
    this.resetPagina();
    this.filtraProdotti();
  }

  private resetPagina(): void {
    this.paginaCorrente = 1;
  }
}
