import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../pagos/pagos';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/pago';

  constructor(private http: HttpClient) {}


  ObtenerPago(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }
}