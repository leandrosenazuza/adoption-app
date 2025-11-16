import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  senha: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Se já estiver autenticado, redireciona
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login(): void {
    if (!this.usuario || !this.senha) {
      this.showMessage('Por favor, preencha todos os campos!', true);
      return;
    }

    this.isLoading = true;
    this.authService.login(this.usuario, this.senha).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.sucesso) {
          this.showMessage('Login realizado com sucesso!');
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          this.showMessage(response.mensagem || 'Erro ao fazer login!', true);
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro no login:', error);
        this.showMessage('Erro ao conectar com o servidor. Verifique se o backend está rodando.', true);
      }
    );
  }

  private showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
}
