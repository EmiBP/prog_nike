import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';

@Injectable({
  providedIn: 'root'
})
export class ServizioService {

  private apiURL = 'http://localhost:3000/prodotti';
  private prodottiCarrello: { prodotto: Prodotto; quantita: number }[] = [];

  // Inicialize o BehaviorSubject aqui
  private carrelloSubject = new BehaviorSubject<any[]>(this.prodottiCarrello);

  constructor(private http: HttpClient) {}

  getAll(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.apiURL);
  }

  getProdottoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getNovosProdutos() {
    return this.http.get('http://localhost:3000/prodotti?nuovo_arrivi=true'); // Filtro para novos produtos
  }

  setProdottoCarrello(prodotto: any) {
    this.prodottiCarrello = prodotto;
  }

  getProdottoCarrello() {
    return this.prodottiCarrello;
  }

  addProdottoCarrello(prodotto: any, quantita: number) {
    const index = this.prodottiCarrello.findIndex(p =>
      p.prodotto.id === prodotto.id &&
      p.prodotto.taglia === prodotto.taglia &&
      p.prodotto.colore === prodotto.colore
    );

    if (index > -1) {
      this.prodottiCarrello[index].quantita += quantita;  // Atualiza a quantidade se o produto já estiver no carrinho
    } else {
      this.prodottiCarrello.push({ prodotto, quantita });
    }

    // Emite a mudança para os inscritos
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

  // Método para obter o observable do carrinho
  getCarrelloObservable() {
    return this.carrelloSubject.asObservable();
  }
}
