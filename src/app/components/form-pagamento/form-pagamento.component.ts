import { Component } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pagamento',
  templateUrl: './form-pagamento.component.html',
  styleUrl: './form-pagamento.component.css'
})
export class FormPagamentoComponent {
  metodoPagamento: string = '';
  formData = {
    nomeCarta: '',
    numeroCarta: '',
    dataCarta: '',
    cvv: ''
  };

  errors: any = {};


  constructor(private servizioService: ServizioService, private router: Router) {}

  // Regular Expressions for validation
  nomeCartaRegex = /^[A-Za-z\s]{2,}$/;
  numeroCartaRegex = /^[0-9]{13,19}$/;
  dataCartaRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  cvvRegex = /^[0-9]{3,4}$/;

  selezionaPagamento(metodo: string) {
    this.metodoPagamento = metodo;
  }

  effettuaOrdine() {
    this.errors = {};

    // Validazione nome sulla carta
    if (!this.nomeCartaRegex.test(this.formData.nomeCarta)) {
      this.errors.nomeCarta = 'Inserisci un nome valido (minimo 2 lettere)';
    }

    if (!this.numeroCartaRegex.test(this.formData.numeroCarta)) {
      this.errors.numeroCarta = 'Inserisci un numero di carta valido (13-19 cifre)';
    }

    if (!this.dataCartaRegex.test(this.formData.dataCarta)) {
      this.errors.dataCarta = 'Inserisci una data di scadenza valida (MM/AA)';
    }

    if (!this.cvvRegex.test(this.formData.cvv)) {
      this.errors.cvv = 'Inserisci un CVV valido (3 o 4 cifre)';
    }


    if (Object.keys(this.errors).length === 0) {
      console.log('Dati di pagamento corretti:', this.formData);
    }
  }



  finalizzaAcquisto() {

    this.servizioService.clearCarrello();
    this.router.navigate(['/final-page']);

  }


}


