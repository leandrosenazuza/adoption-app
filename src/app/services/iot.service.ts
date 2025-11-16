import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IotData {
  temperatura: number;
  umidade: number;
  localizacao: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class IotService {
  private baseUrl = `${environment.apiUrl}/iot`;

  constructor(private http: HttpClient) { }

  getDadosIot(): Observable<IotData> {
    return this.http.get<IotData>(`${this.baseUrl}/dados`);
  }

  getDadosIotMultiplos(quantidade: number = 3): Observable<IotData[]> {
    return this.http.get<IotData[]>(`${this.baseUrl}/dados/multiplos?quantidade=${quantidade}`);
  }
}

