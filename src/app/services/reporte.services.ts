import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteItem } from '../reportes/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = 'https://digi-api.com/api/v1/digimon';//'http://localhost:8080/api/reporte';

  constructor(private http: HttpClient) {}


  ObtenerReporte(): Observable<ReporteItem[]> {
    return this.http.get<ReporteItem[]>(this.apiUrl);
  }
}