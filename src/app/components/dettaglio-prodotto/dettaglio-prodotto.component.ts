import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';

@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrls: ['./dettaglio-prodotto.component.css']
})
export class DettaglioProdottoComponent implements OnInit {
[x: string]: any;

  prodotto: any;

  constructor(private route: ActivatedRoute, private servizioService: ServizioService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.servizioService.getProdottoById(id).subscribe((data) => {
      this.prodotto = data;
    });
  }
}
