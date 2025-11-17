import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Solicitacao {
  id?: number;
  nomeInteressado: string;
  telefoneInteressado: string;
  emailInteressado: string;
  animalId: number;
  usuarioId?: number;
  animalDTO?: any;
}

export interface RetornoPadrao {
  sucesso: boolean;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private baseUrl = `${environment.apiUrl}/solicitacao`;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  criarSolicitacao(solicitacao: Solicitacao): Observable<RetornoPadrao> {
    return this.http.post<RetornoPadrao>(`${this.baseUrl}/solicitar/criar`, solicitacao);
  }

  listarTodas(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.baseUrl}/solicitar/listarTodasSemPaginacao`);
  }

  deletar(id: number): Observable<RetornoPadrao> {
    return this.http.delete<RetornoPadrao>(`${this.baseUrl}/solicitar/apagar/${id}`);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
}

