import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../components/template/header/header.service';
import { SolicitacaoService, Solicitacao } from '../../services/solicitacao.service';

@Component({
  selector: 'app-interessados',
  templateUrl: './interessados.component.html',
  styleUrls: ['./interessados.component.css']
})
export class InteressadosComponent implements OnInit {
  interessados: Solicitacao[] = [];
  isLoading: boolean = true;
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'animal', 'acoes'];

  constructor(
    private headerService: HeaderService,
    private solicitacaoService: SolicitacaoService
  ) {
    headerService.headerData = {
      title: 'Interessados',
      icon: 'people',
      routeUrl: '/interessados'
    }
  }

  ngOnInit(): void {
    this.carregarInteressados();
  }

  carregarInteressados(): void {
    this.isLoading = true;
    this.solicitacaoService.listarTodas().subscribe(
      (dados) => {
        this.interessados = dados;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar interessados:', error);
        this.solicitacaoService.showMessage('Erro ao carregar interessados', true);
        this.isLoading = false;
      }
    );
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja excluir este interesse?')) {
      this.solicitacaoService.deletar(id).subscribe(
        () => {
          this.solicitacaoService.showMessage('Interesse excluído com sucesso!');
          this.carregarInteressados();
        },
        (error) => {
          console.error('Erro ao excluir interesse:', error);
          this.solicitacaoService.showMessage('Erro ao excluir interesse', true);
        }
      );
    }
  }

  getNomeAnimal(animalDTO: any): string {
    return animalDTO?.nome || 'N/A';
  }
}

