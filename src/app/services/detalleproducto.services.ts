import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleProducto } from '../detalledeproducto/detalledeproducto';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/detalleproducto';

  constructor(private http: HttpClient) {}


  ObtenerDetalle(): Observable<DetalleProducto[]> {
    return this.http.get<DetalleProducto[]>(this.apiUrl);
  }
}