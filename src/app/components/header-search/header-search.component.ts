import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServizioService } from '../../services/servizio.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {



  queryField: FormControl = new FormControl();
  results$!: Observable<any>;

  constructor(private servizioService: ServizioService, private router: Router) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges.pipe(
      startWith(''),
      map(query => this.filterResults(query))
    );
  }

  filterResults(query: string): Observable<any[]> {
    return this.servizioService.getAll().pipe(
      map(prodotti =>
        prodotti.filter(prod =>
          prod.nome.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  onSelectItem(id: number): void {
    this.router.navigate([`/dettaglio-prodotto/${id}`]);
    }

  onSearch(): void {
    const query = this.queryField.value.trim();
    if (query) {
      this.results$ = this.filterResults(query);
    }
  }


  showComponentA: boolean = true;


  hideComponentA(): void {
    this.showComponentA = false;
  }


}
