import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServizioService {



  private apiURL = 'http://localhost:3000/prodotti';
  private prodottiCarrello: { prodotto: Prodotto; quantita: number }[] = [];


  private carrelloSubject = new BehaviorSubject<any[]>(this.prodottiCarrello);

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.apiURL);
  }

  getProdottoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getNovosProdutos() {
    return this.http.get('http://localhost:3000/prodotti?nuovo_arrivi=true');
  }

  setProdottoCarrello(prodotto: any) {
    this.prodottiCarrello = prodotto;
  }

  getProdottoCarrello() {
    return this.prodottiCarrello;
  }

  addProdottoCarrello(prodotto: any, quantita: number) {
    console.log('Produto recebido para adicionar ao carrinho:', prodotto, 'Quantidade:', quantita);
    const index = this.prodottiCarrello.findIndex(p =>
      p.prodotto.id === prodotto.id &&
      p.prodotto.taglia === prodotto.taglia &&
      p.prodotto.colore === prodotto.colore
    );

    if (index > -1) {
      this.prodottiCarrello[index].quantita += quantita;
    } else {
      this.prodottiCarrello.push({ prodotto, quantita });
    }


    this.carrelloSubject.next(this.prodottiCarrello);
  }

  getProdottiCarrello() {
    return this.prodottiCarrello;
  }

  updateQuantita(prodottoId: number, quantita: number) {
    const index = this.prodottiCarrello.findIndex(item => item.prodotto.id === prodottoId);
    if (index !== -1) {
      this.prodottiCarrello[index].quantita = quantita;
    }
  }

  getCarrelloObservable() {
    return this.carrelloSubject.asObservable();
  }

  removeProdottoCarrello(prodottoId: number, taglia: string, colore: string) {
    const index = this.prodottiCarrello.findIndex(p =>
      p.prodotto.id === prodottoId &&
      p.prodotto.taglia === taglia &&
      p.prodotto.colore === colore
    );

    if (index > -1) {
      this.prodottiCarrello.splice(index, 1); // Remove o item do array
    }

    // Emite a mudança para os inscritos
    this.carrelloSubject.next(this.prodottiCarrello);
  }

  vaiAlCarrello(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);  // Cancela o timeout se existir
    }
    this.router.navigate(['/carrello']);  // Redireciona para o componente de carrinho
  }

  // Método para redirecionar ao pagamento
  vaiAlPagamento(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);  // Cancela o timeout se existir
    }
    this.router.navigate(['/form-pagamento']);  // Redireciona para o componente de pagamento
  }

  vaiAConsegna(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);  // Cancela o timeout se existir
    }
    this.router.navigate(['/consegna']);  // Redireciona para o componente de pagamento
  }

  vaiAllaPaginaFinalpage(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);  // Cancela o timeout se existir
    }
    this.router.navigate(['/final-page']);  // Redireciona para o componente de pagamento
  }





}
