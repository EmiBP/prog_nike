import { ServizioService } from './../../services/servizio.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  showItem: boolean = false;

   // Método chamado ao mover o mouse sobre a div
   onMouseEnter() {
    this.showItem = true;



  }

  // Método chamado ao sair com o mouse da div
  onMouseLeave() {
    this.showItem = false;


  }


  constructor(private router: Router, private servizioService: ServizioService) {}

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



}
