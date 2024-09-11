import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';
@Injectable({
  providedIn: 'root'
})
export class ServizioService {
 private apiURL = 'http://localhost:3000/prodotti'
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Prodotto[]> {

    return this.http.get<Prodotto[]>(this.apiURL)
  }

  getProdottoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  getNovosProdutos() {
    return this.http.get('http://localhost:3000/prodotti?nuovo_arrivi=true'); // Filtro para novos produtos
  }






}
