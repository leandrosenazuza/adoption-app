import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Cirurgia {
  id: number;
  descricaoCirurgia: string;
}

@Injectable({
  providedIn: 'root'
})
export class CirurgiaService {
  private apiUrl = `${environment.apiUrl}/cirurgia`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cirurgia[]> {
    return this.http.get<Cirurgia[]>(`${this.apiUrl}/get/all`);
  }
}

