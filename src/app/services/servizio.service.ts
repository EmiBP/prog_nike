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
    const limit = 25;
    return this.http.get<Prodotto[]>(`${this.apiURL}?_limit=${limit}`);
  }

  getProdottoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getNovosProdutos() {
    const limit = 25;
    return this.http.get(`${this.apiURL}?nuovo_arrivi=true&_limit=${limit}`);
  }

  setProdottoCarrello(prodottiCarrello: { prodotto: Prodotto; quantita: number }[]) {
    this.prodottiCarrello = prodottiCarrello;
    this.carrelloSubject.next(this.prodottiCarrello);
  }


  clearCarrello() {
    this.prodottiCarrello = [];
    this.carrelloSubject.next(this.prodottiCarrello);
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
      this.carrelloSubject.next(this.prodottiCarrello);
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
      this.prodottiCarrello.splice(index, 1);
    }

    this.carrelloSubject.next(this.prodottiCarrello);
  }

  vaiAlCarrello(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    this.router.navigate(['/carrello']);
  }

  vaiAlPagamento(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    this.router.navigate(['/form-pagamento']);
  }

  vaiAConsegna(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    this.router.navigate(['/consegna']);
  }

  vaiAllaPaginaFinalpage(timeoutId: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    this.router.navigate(['/final-page']);
  }





}
