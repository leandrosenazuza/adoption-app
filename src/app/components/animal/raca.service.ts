import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Raca {
  id: number;
  descricaoRaca: string;
}

@Injectable({
  providedIn: 'root'
})
export class RacaService {
  private apiUrl = `${environment.apiUrl}/raca`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Raca[]> {
    return this.http.get<Raca[]>(`${this.apiUrl}/get/all`);
  }
}

