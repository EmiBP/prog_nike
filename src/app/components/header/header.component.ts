import { query } from '@angular/animations';
import { ServizioService } from './../../services/servizio.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


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



  constructor(private router: Router, private servizioService: ServizioService) {}


  ngOnInit(): void {
    this.aggiornaNumeroProdottiCarrello();
  }

  aggiornaNumeroProdottiCarrello() {
    const prodotti = this.servizioService.getProdottiCarrello();
    this.numeroProdottiCarrello = prodotti.reduce((total, item) => total + item.quantita, 0);
  }


  vaiAlCarrello() {
    this.router.navigate(['/carrello']);
  }



   // Método chamado ao mover o mouse sobre a div
   onMouseEnter() {
    this.showItem = true;



  }

  // Método chamado ao sair com o mouse da div
  onMouseLeave() {
    this.showItem = false;


  }






  selezionaSport(categoria: string) {
    this.router.navigate(['/sport', categoria]);
  }



  verificarNovosProdutos() {
    this.servizioService.getNovosProdutos().subscribe((response: any) => {
      if (response.length > 0) {
        // Se houver novos produtos, redireciona
        this.router.navigate(['/nuovi-arrivi']);
      } else {
        // Exibe mensagem se não houver novos produtos
        alert('Nenhum novo produto disponível no momento.');
      }
    });
  }

  toggleHeaderSearch(): void {
    this.showHeaderSearch = !this.showHeaderSearch;

  }

  // Método para redirecionar e fechar o menu
  navegaEFecha(url: string): void {
    this.router.navigate([url]).then(() => {
      this.showItem = false;  // Fecha o menu
    });
  }



}
