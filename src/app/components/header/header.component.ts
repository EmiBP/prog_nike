import { ServizioService } from './../../services/servizio.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
