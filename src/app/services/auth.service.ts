import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  usarioSistema: string;
  senha: string;
}

export interface LoginResponse {
  sucesso: boolean;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/usuario`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    if (this.hasToken()) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(usuario: string, senha: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      usarioSistema: usuario,
      senha: senha
    };

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest).pipe(
      tap(response => {
        if (response.sucesso) {
          localStorage.setItem('auth_token', 'authenticated');
          localStorage.setItem('usuario', usuario);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken() && this.isAuthenticatedSubject.value;
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

