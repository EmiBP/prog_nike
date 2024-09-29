import { Component } from '@angular/core';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-consenga',
  templateUrl: './consenga.component.html',
  styleUrl: './consenga.component.css'
})
export class ConsengaComponent {

  formData = {
    nome: '',
    cognome: '',
    indirizzo1: '',
    indirizzo2: '',
    codicePostale: '',
    citta: '',
    paese: '',
    email: '',
    telefono: ''
  };

  errors: any = {};

  // Regular Expressions for validation
  nomeCognomeRegex = /^[A-Za-z\s]{2,}$/;
  indirizzoRegex = /^[A-Za-z0-9\s,.'-]{3,}$/;
  codicePostaleRegex = /^[0-9]{5}$/;
  cittaRegex = /^[A-Za-z\s]{2,}$/;
  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  telefonoRegex = /^[0-9]{10,15}$/;

  constructor(private servizioService: ServizioService) {}


  onSubmit() {
    this.errors = {};

    if (!this.nomeCognomeRegex.test(this.formData.nome)) {
      this.errors.nome = 'Inserisci un nome valido (minimo 2 lettere)';
    }

    if (!this.nomeCognomeRegex.test(this.formData.cognome)) {
      this.errors.cognome = 'Inserisci un cognome valido (minimo 2 lettere)';
    }

    if (!this.indirizzoRegex.test(this.formData.indirizzo1)) {
      this.errors.indirizzo1 = 'Inserisci un indirizzo valido (minimo 3 caratteri)';
    }

    if (!this.codicePostaleRegex.test(this.formData.codicePostale)) {
      this.errors.codicePostale = 'Inserisci un codice postale valido (5 cifre)';
    }

    if (!this.cittaRegex.test(this.formData.citta)) {
      this.errors.citta = 'Inserisci una città valida (minimo 2 lettere)';
    }

    if (this.formData.paese === '') {
      this.errors.paese = 'Seleziona un paese';
    }

    if (!this.emailRegex.test(this.formData.email)) {
      this.errors.email = 'Inserisci un\'email valida';
    }

    if (!this.telefonoRegex.test(this.formData.telefono)) {
      this.errors.telefono = 'Inserisci un numero di telefono valido (10-15 cifre)';
    }

    if (Object.keys(this.errors).length === 0) {
      console.log('Form inviato correttamente:', this.formData);
      this.vaiAlPagamento();
    }
  }
  vaiAlPagamento() {
    this.servizioService.vaiAlPagamento(this.timeoutId);
  }
  timeoutId(timeoutId: any) {
    throw new Error('Method not implemented.');
  }
}




