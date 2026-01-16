import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../pedidos/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/pedido';

  constructor(private http: HttpClient) {}


  ObtenerPedido(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
}