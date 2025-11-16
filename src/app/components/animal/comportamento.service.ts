import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Comportamento {
  id: number;
  descricaoComportamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComportamentoService {
  private apiUrl = `${environment.apiUrl}/comportamento`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Comportamento[]> {
    return this.http.get<Comportamento[]>(`${this.apiUrl}/get/all`);
  }
}

