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
  prodottiFiltrati: any[] = []; // Produtos filtrados após a aplicação dos filtros
  prodottiVisualizzati: any[] = [];
  prodottiPerPagina: number = 6;
  paginaCorrente: number = 1;

  categorie: string[] = ['Sneakers', 'Running', 'Casual', 'Sport'];
  colori: string[] = ['Nero', 'Bianco', 'Grigio', 'Blu', 'Rosso'];

  categoriaSelezionata: string | null = null;
  coloreSelezionato: string | null = null;
  prezzoFiltro: number = 500; // Filtro de preço máximo

  constructor(private servizioService: ServizioService, private router: Router) {}

  ngOnInit(): void {
    // Carregar todos os produtos do servidor
    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data;
      console.log('Itens retornados:', data);

      // Mostra o total de itens carregados antes dos filtros
      // Aplica os filtros ao iniciar
      this.filtraProdotti();
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

  // Filtro por cor
  selezionaColore(colore: string): void {
    this.coloreSelezionato = colore;
    this.paginaCorrente = 1; // Reseta a página atual ao aplicar filtro
    this.filtraProdotti();
  }

  // Filtro principal que considera categoria, cor e preço
  filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti
      .filter(prodotto => {
        // Aplica o filtro de categoria apenas se estiver selecionado
        const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;

        // Aplica o filtro de cor apenas se estiver selecionado
        const coloreValido = !this.coloreSelezionato || prodotto.colori_disponibili.includes(this.coloreSelezionato);

        // Aplica sempre o filtro de preço, independentemente dos outros filtros
        const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

        // Retorna o produto se o preço for válido, mesmo que outros filtros não estejam selecionados
        return prezzoValido && (!this.categoriaSelezionata || categoriaValida) && (!this.coloreSelezionato || coloreValido);
      });

    // Atualizar a visualização com base na página corrente
    this.caricaProdotti();
  }

  // Reseta os filtros para os valores padrão
  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.coloreSelezionato = null;
    this.prezzoFiltro = 500; // Reset para preço padrão
    this.paginaCorrente = 1; // Reset para a primeira página
    this.filtraProdotti();
  }
}
