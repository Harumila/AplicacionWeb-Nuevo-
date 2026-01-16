import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../productos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}


  ObtenerProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
