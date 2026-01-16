import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaludoService {

  private apiUrl = 'http://localhost:8080/api/health';

  constructor(private http: HttpClient) {}

  obtenerSalud() {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
