import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  prodotti: any[] = [];
  prodottiFiltrati: any[] = [];
  prodottiVisualizzati: any[] = [];
  prodottiPerPagina: number = 6;
  paginaCorrente: number = 1;

  categorie: string[] = ['Calcio', 'Running', 'Basket', 'Fitness', 'Golf', 'Tennis', 'Yoga', 'Danza', 'Skateboard'];
  categoriaSelezionata: string | null = null;
  prezzoFiltro: number = 500;

  constructor(
    private servizioService: ServizioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaSelezionata = params['categoria'] || null;
      this.paginaCorrente = 1;
      this.filtraProdotti();
    });


    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data;
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


  filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti
      .filter(prodotto => {
        const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;

        const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

        return prezzoValido && (!this.categoriaSelezionata || categoriaValida);
      });

    this.caricaProdotti();
  }

  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.prezzoFiltro = 500;
    this.paginaCorrente = 1;
    this.filtraProdotti();
  }
}
