import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../categorias/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}


  ObtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
