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
    this.loadProdotti(); // Carregar produtos ao iniciar
  }

  // Método para carregar produtos do serviço
  private loadProdotti(): void {
    this.servizioService.getAll().subscribe((data) => {
      this.prodotti = data;
      this.filtraProdotti(); // Aplica os filtros após carregar os produtos
    });
  }



  // Navegar para a página de detalhes do produto
  onItemClick(id: number): void {
    // Lógica para navegar ou realizar ação ao clicar no produto
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
  }

  // Carregar produtos da página atual
  private caricaProdotti(): void {
    const inizio = (this.paginaCorrente - 1) * this.prodottiPerPagina;
    const fine = this.paginaCorrente * this.prodottiPerPagina;
    this.prodottiVisualizzati = this.prodottiFiltrati.slice(inizio, fine);
  }

  // Carregar mais produtos (paginação)
  caricaAltriProdotti(): void {
    this.paginaCorrente++;
    this.caricaProdotti();
    // Lógica adicional para verificar se há mais produtos para carregar
    if (this.prodottiFiltrati.length > this.paginaCorrente * this.prodottiPerPagina) {
      this.caricaProdotti();
    } else {
      console.log('Não há mais produtos para carregar.');
    }
  }

  // Selecionar categoria e aplicar filtro
  selezionaCategoria(categoria: string): void {
    this.categoriaSelezionata = categoria;
    this.resetPagina(); // Reseta a página ao aplicar filtro
    this.filtraProdotti();
  }

  // Selecionar cor e aplicar filtro
  selezionaColore(colore: string): void {
    this.coloreSelezionato = colore;
    this.resetPagina(); // Reseta a página ao aplicar filtro
    this.filtraProdotti();
  }

  // Filtra produtos com base em categoria, cor e preço
  public filtraProdotti(): void {
    this.prodottiFiltrati = this.prodotti.filter(prodotto => {
      const categoriaValida = !this.categoriaSelezionata || prodotto.categoria === this.categoriaSelezionata;
      const coloreValido = !this.coloreSelezionato || prodotto.colori_disponibili.includes(this.coloreSelezionato);
      const prezzoValido = prodotto.prezzo <= this.prezzoFiltro;

      return categoriaValida && coloreValido && prezzoValido;
    });

    this.caricaProdotti(); // Atualiza a visualização com produtos filtrados
  }

  // Reseta os filtros para os valores padrão
  resetFiltri(): void {
    this.categoriaSelezionata = null;
    this.coloreSelezionato = null;
    this.prezzoFiltro = 500;
    this.resetPagina(); // Reseta para a primeira página
    this.filtraProdotti();
  }

  // Reseta a página atual
  private resetPagina(): void {
    this.paginaCorrente = 1;
  }
}
