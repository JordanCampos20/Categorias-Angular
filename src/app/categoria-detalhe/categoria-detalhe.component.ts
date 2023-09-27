import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/model/categoria";
import { ApiService } from "src/services/api.service";

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.scss']
})

export class CategoriaDetalheComponent implements OnInit {
  categoria: Categoria = { categoriaId: '', nome: '', imagemUrl: '' };
  isLoadingResults = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
  }

  getCategoria(id : String | undefined) {
    this.api.getCategoria(Number(id))
      .subscribe(res => {
        this.categoria = res
        console.log(this.categoria);
        this.isLoadingResults = false;
      });
  }

  deleteCategoria(id : String | undefined) {
    this.isLoadingResults = true;
    this.api.deleteCategoria(Number(id))
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }
}
