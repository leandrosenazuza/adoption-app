import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SolicitacaoService, Solicitacao } from '../../../services/solicitacao.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-demonstrar-interesse',
  templateUrl: './demonstrar-interesse.component.html',
  styleUrls: ['./demonstrar-interesse.component.css']
})
export class DemonstrarInteresseComponent implements OnInit {
  solicitacao: Solicitacao = {
    nomeInteressado: '',
    telefoneInteressado: '',
    emailInteressado: '',
    animalId: 0
  };
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DemonstrarInteresseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { animalId: number, animalNome: string },
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {
    this.solicitacao.animalId = data.animalId;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const usuarioId = this.getUsuarioIdFromStorage();
      if (usuarioId) {
        this.solicitacao.usuarioId = usuarioId;
      }
    }
  }

  getUsuarioIdFromStorage(): number | undefined {
    const usuarioId = localStorage.getItem('usuario_id');
    return usuarioId ? parseInt(usuarioId, 10) : undefined;
  }

  salvar(): void {
    if (!this.solicitacao.nomeInteressado || !this.solicitacao.emailInteressado || !this.solicitacao.telefoneInteressado) {
      this.solicitacaoService.showMessage('Por favor, preencha todos os campos obrigatórios!', true);
      return;
    }

    this.isLoading = true;
    this.solicitacaoService.criarSolicitacao(this.solicitacao).subscribe(
      (response) => {
        this.isLoading = false;
        if (response.sucesso) {
          this.solicitacaoService.showMessage(response.mensagem || 'Interesse registrado com sucesso!');
          this.dialogRef.close(true);
        } else {
          this.solicitacaoService.showMessage(response.mensagem || 'Erro ao registrar interesse', true);
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Erro ao registrar interesse:', error);
        this.solicitacaoService.showMessage('Erro ao registrar interesse. Tente novamente.', true);
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}

