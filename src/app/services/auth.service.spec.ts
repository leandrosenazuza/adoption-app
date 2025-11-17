import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, LoginResponse } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when user is not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should login successfully', () => {
    const mockResponse: LoginResponse = {
      sucesso: true,
      mensagem: 'Login realizado com sucesso'
    };

    let responseReceived = false;
    service.login('usuario', 'senha123').subscribe(response => {
      responseReceived = true;
      expect(response.sucesso).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/usuario/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.usarioSistema).toBe('usuario');
    expect(req.request.body.senha).toBe('senha123');
    req.flush(mockResponse);

    expect(responseReceived).toBeTruthy();
    expect(localStorage.getItem('auth_token')).toBe('authenticated');
    expect(localStorage.getItem('usuario')).toBe('usuario');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should handle login failure', () => {
    const mockResponse: LoginResponse = {
      sucesso: false,
      mensagem: 'Credenciais inválidas'
    };

    service.login('usuario', 'senhaErrada').subscribe(response => {
      expect(response.sucesso).toBeFalsy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/usuario/login`);
    req.flush(mockResponse);

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should logout and clear localStorage', () => {
    // Setup: simulate logged in state
    localStorage.setItem('auth_token', 'authenticated');
    localStorage.setItem('usuario', 'teste');
    
    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should return username from localStorage', () => {
    localStorage.setItem('usuario', 'joao');
    expect(service.getUsuario()).toBe('joao');
  });

  it('should return empty string when no user in localStorage', () => {
    localStorage.removeItem('usuario');
    expect(service.getUsuario()).toBe('');
  });
});

