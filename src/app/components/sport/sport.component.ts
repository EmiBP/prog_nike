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
    private router: Router  // Injete o Router aqui
  ) {}

  ngOnInit(): void {
    // Captura a categoria da URL
    this.route.params.subscribe(params => {
      this.categoriaSelezionata = params['categoria'] || null;
      this.paginaCorrente = 1; // Reseta a página corrente ao carregar
      this.filtraProdotti(); // Aplica o filtro com base na categoria selecionada
    });

    // Carregar todos os produtos do servidor
    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data;
      this.filtraProdotti(); // Aplica os filtros ao iniciar
    });
  }

  onItemClick(id: number) {
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
  }

  // Carregar produtos da página atual
  caricaProdotti(): void {
    const inizio = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    const fine = this.paginaCorrente * this.prodottiPerPagina;
    this.prodottiVisualizzati = this.prodottiFiltrati.slice(inizio, fine);
  }

  // Carregar mais produtos (paginação)
  caricaAltriProdotti(): void {
    this.paginaCorrente++;
    this.caricaProdotti();
  }

  // Filtro por categoria
  selezionaCategoria(categoria: string): void {
    this.categoriaSelezionata = categoria;
    this.paginaCorrente = 1; // Reseta a página atual ao aplicar filtro
    this.filtraProdotti();
  }

  // Filtro principal que considera categoria e preço
  filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti
      .filter(prodotto => {
        // Aplica o filtro de categoria apenas se estiver selecionado
        const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;

        // Aplica sempre o filtro de preço
        const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

        return prezzoValido && (!this.categoriaSelezionata || categoriaValida);
      });

    // Atualizar a visualização com base na página corrente
    this.caricaProdotti();
  }

  // Reseta os filtros para os valores padrão
  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.prezzoFiltro = 500; // Reset para preço padrão
    this.paginaCorrente = 1; // Reset para a primeira página
    this.filtraProdotti();
  }
}
