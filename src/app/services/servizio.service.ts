import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServizioService {




  private apiURL = 'https://database-nike.vercel.app/prodotti';
  private prodottiCarrello: { prodotto: Prodotto; quantita: number }[] = [];


  private carrelloSubject = new BehaviorSubject<any[]>(this.prodottiCarrello);

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<Prodotto[]> {
    const limit = 25;  // Defina o limite de itens aqui
    return this.http.get<Prodotto[]>(`${this.apiURL}?_limit=${limit}`);
  }

  getProdottoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getNovosProdutos() {
    const limit = 25;  // Limite de itens
    return this.http.get(`${this.apiURL}?nuovo_arrivi=true&_limit=${limit}`);
  }

  setProdottoCarrello(prodottiCarrello: { prodotto: Prodotto; quantita: number }[]) {
    this.prodottiCarrello = prodottiCarrello; // Atualize o array local
    this.carrelloSubject.next(this.prodottiCarrello); // Emita a nova versão do carrinho para os observadores
  }


  clearCarrello() {
    this.prodottiCarrello = [];
    this.carrelloSubject.next(this.prodottiCarrello); // Emite a mudança para os inscritos
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
      this.carrelloSubject.next(this.prodottiCarrello);  // Emite a mudança para todos os inscritos
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
