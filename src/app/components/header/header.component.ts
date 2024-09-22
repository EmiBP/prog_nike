import { query } from '@angular/animations';
import { ServizioService } from './../../services/servizio.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Adicione a interface aqui, antes da classe HeaderComponent
export interface SubCategoria {
  nome: string;
  opcoes?: { nome: string; acao?: () => void }[]; // Opções são opcionais
}

interface Categoria {
  nome: string;
  subCategorie: (string | SubCategoria)[]; // subCategorie pode ser string ou SubCategoria
  aperto: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showHeaderSearch: boolean = false;
  showItem: boolean = false;
  inputSearch: any;
  numeroProdottiCarrello: number = 0;
  prodottiCarrello: any[] = [];


  menuLateraleAperto = false;

  // Defina as categorias usando a nova estrutura
  categorie: Categoria[] = [
    {
      nome: 'Novità e in evidenza',
      subCategorie: [
        {
          nome: 'In evidenza',
          opcoes: [
            { nome: 'Tutti i nuovi arrivi', acao: () => this.navegaEFecha('/nuovi-arrivi') },
            { nome: 'Best seller', acao: () => this.navegaEFecha('/best-seller') }
          ]
        },
        {
          nome: 'Scopri le icone',
          opcoes: [
            { nome: 'Air Force 1' },
            { nome: 'Air Jordan' },
            { nome: 'Air Max' },
            { nome: 'Dunk' },
            { nome: 'Blazer' },
            { nome: 'Pegasus' },
            { nome: 'Mercurial' }
          ]
        },
        {
          nome: 'Scopri lo sport',
          opcoes: [
            { nome: 'Calcio', acao: () => this.navegaEFecha('/sport/Calcio') },
            { nome: 'Running', acao: () => this.navegaEFecha('/sport/Running') },
            { nome: 'Basket', acao: () => this.navegaEFecha('/sport/Basket') },
            { nome: 'Fitness', acao: () => this.navegaEFecha('/sport/Fitness') },
            { nome: 'Golf', acao: () => this.navegaEFecha('/sport/Golf') },
            { nome: 'Tennis', acao: () => this.navegaEFecha('/sport/Tennis') },
            { nome: 'Yoga', acao: () => this.navegaEFecha('/sport/Yoga') },
            { nome: 'Danza', acao: () => this.navegaEFecha('/sport/Danza') },
            { nome: 'Skateboard', acao: () => this.navegaEFecha('/sport/Skateboard') }
          ]
        }
      ],
      aperto: false
    }
  ];


  constructor(private router: Router, private servizioService: ServizioService) {}

  ngOnInit(): void {
    this.servizioService.getCarrelloObservable().subscribe((prodottiCarrello) => {
      this.numeroProdottiCarrello = prodottiCarrello.reduce((total, item) => total + item.quantita, 0);
    });
  }

  isString(subCategoria: any): subCategoria is string {
    return typeof subCategoria === 'string';
  }

  toggleMenuLaterale() {
    this.menuLateraleAperto = !this.menuLateraleAperto;
  }

  // Tipando o parâmetro categoria com a interface Categoria
  toggleSubMenu(categoria: Categoria) {
    categoria.aperto = !categoria.aperto;
  }

  aggiornaNumeroProdottiCarrello() {
    const prodotti = this.servizioService.getProdottiCarrello();
    this.numeroProdottiCarrello = prodotti.reduce((total, item) => total + item.quantita, 0);
  }

  vaiAlCarrello() {
    this.router.navigate(['/carrello']);
  }

  onMouseEnter() {
    this.showItem = true;
  }

  onMouseLeave() {
    this.showItem = false;
  }

  selezionaSport(categoria: string) {
    this.router.navigate(['/sport', categoria]);
  }

  verificarNovosProdutos() {
    this.servizioService.getNovosProdutos().subscribe((response: any) => {
      if (response.length > 0) {
        this.router.navigate(['/nuovi-arrivi']);
      } else {
        alert('Nenhum novo produto disponível no momento.');
      }
    });
  }

  toggleHeaderSearch(): void {
    this.showHeaderSearch = !this.showHeaderSearch;
  }

  navegaEFecha(url: string): void {
    this.menuLateraleAperto = false; // Fecha o menu lateral
    this.router.navigate([url]).then(() => {
      this.showItem = false;
    });
  }

  goToBestSeller(): void {
    this.router.navigate(['/best-seller']);
  }
}
