import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EstatisticaMunicipio {
  municipio: string;
  adocoesAnuais: number;
  castracoesAnuais: number;
  recolhimentos: number;
  taxaAbandono: number;
}

export interface EstatisticasGerais {
  totalAdocoes: number;
  totalCastracoes: number;
  totalRecolhimentos: number;
  mediaTaxaAbandono: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstatisticasService {
  private baseUrl = `${environment.apiUrl}/estatisticas`;

  constructor(private http: HttpClient) { }

  getEstatisticasMunicipios(): Observable<EstatisticaMunicipio[]> {
    return this.http.get<EstatisticaMunicipio[]>(`${this.baseUrl}/municipios`);
  }

  getEstatisticasGerais(): Observable<EstatisticasGerais> {
    return this.http.get<EstatisticasGerais>(`${this.baseUrl}/gerais`);
  }
}

