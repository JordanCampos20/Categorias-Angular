import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/model/categoria";
import { ApiService } from "src/services/api.service";

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit {
  categoriaId: String | undefined = '';
  categoriaForm!: FormGroup;
  nome: String = '';
  imagemUrl: String = '';
  dataSource!: Categoria;
  isLoadingResults = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: ApiService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
    this.categoriaForm = this.formBuilder.group({
      'categoriaId' : [null],
      'nome' : [null, Validators.required],
      'imagemUrl' : [null, Validators.required]
    });
  }

  getCategoria(id : Number) {
    this.api.getCategoria(<number> id)
      .subscribe(res => {
        this.categoriaId = res.categoriaId?.toString(),
        this.categoriaForm.setValue({
          categoriaId: res.categoriaId?.toString(),
          imagemUrl: res.imagemUrl?.toString(),
          nome: res.nome?.toString(),
        });
      });
  }

  updateCategoria(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCategoria(Number(this.categoriaId), <Categoria> form)
      .subscribe(res => {
        this.dataSource = res;
        this.isLoadingResults = false;
        this.router.navigate(['/categoria-detalhe/' + this.categoriaId]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }
}
