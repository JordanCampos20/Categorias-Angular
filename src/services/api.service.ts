import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map, take } from "rxjs/operators";
import { Categoria } from "src/model/categoria";
import { Usuario } from "src/model/usuario";

const apiUrl = 'https://localhost:7050/Categorias';
const apiLoginUrl = 'https://localhost:7050/api/autoriza/login';
var token: string | null = '';
var httpOptions = { headers: new HttpHeaders({"Content-Type": "application/json"}) };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken() {
    token = localStorage.getItem("jwt");
    console.log('jwt header token ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token, "Content-Type": "application/json"})};
  }

  Login (Usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => console.log(`Login usuario com email = ${Usuario.email}`)),
      catchError(this.handleError<Usuario>('Login'))
    )
  }

  getCategorias (): Observable<Categoria[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Categoria[]>(apiUrl, httpOptions)
      .pipe(
        tap(Categorias => console.log('Leu as categorias')),
        catchError(this.handleError<Categoria[]>('getCategorias'))
      )
  }

  getCategoria (id: number): Observable<Categoria> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    const url = `${apiUrl}/${id}`
    return this.http.get<Categoria>(url, httpOptions)
      .pipe(
        tap(Categorias => console.log(`Leu a categoria id=${id}`)),
        catchError(this.handleError<Categoria>('getCategoria'))
      )
  }

  addCategoria (Categoria: Categoria): Observable<Categoria> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.post<Categoria>(apiUrl, Categoria, httpOptions)
      .pipe(
        tap(Categorias => console.log(`addCategoria`)),
        catchError(this.handleError<Categoria>('getCategoria'))
      )
  }

  updateCategoria (id: number, Categoria: Categoria): Observable<Categoria> {
    console.log(httpOptions.headers);
    const url = `${apiUrl}/${id}`
    return this.http.put<Categoria>(url, Categoria, httpOptions)
      .pipe(
        tap(Categorias => console.log(`updateCategoria id=${id}`)),
        catchError(this.handleError<Categoria>('getCategoria'))
      )
  }

  deleteCategoria (id: number): Observable<Categoria> {
    console.log(httpOptions.headers);
    const url = `${apiUrl}/${id}`
    return this.http.delete<Categoria>(url, httpOptions)
      .pipe(
        tap(Categorias => console.log(`deleteCategoria id=${id}`)),
        catchError(this.handleError<Categoria>('getCategoria'))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
