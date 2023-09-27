import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/model/usuario";
import { ApiService } from "src/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: String = '';
  password: String = '';
  ConfirmPassword: String = '';
  dataSource!: Usuario;
  isLoadingResults = false;

  constructor(private router: Router,
              private api: ApiService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'ConfirmPassword' : [null, Validators.required]
    });
  }

  addLogin(form: NgForm) {
    this.isLoadingResults = true;
    this.api.Login(<Usuario> form)
      .subscribe(res => {
        this.dataSource = res;
        localStorage.setItem("jwt", this.dataSource.token!);
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }
}
