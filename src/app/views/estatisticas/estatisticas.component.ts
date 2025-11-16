import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../components/template/header/header.service';
import { EstatisticasService, EstatisticaMunicipio, EstatisticasGerais } from '../../services/estatisticas.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {
  displayedColumns: string[] = ['municipio', 'adocoesAnuais', 'castracoesAnuais', 'recolhimentos', 'taxaAbandono'];
  dataSource: EstatisticaMunicipio[] = [];
  estatisticasGerais: EstatisticasGerais = {
    totalAdocoes: 0,
    totalCastracoes: 0,
    totalRecolhimentos: 0,
    mediaTaxaAbandono: 0
  };
  isLoading: boolean = true;

  constructor(
    private headerService: HeaderService,
    private estatisticasService: EstatisticasService
  ) {
    headerService.headerData = {
      title: 'Estatísticas',
      icon: 'bar_chart',
      routeUrl: '/estatisticas'
    }
  }

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas(): void {
    this.isLoading = true;
    
    // Carregar dados dos municípios
    this.estatisticasService.getEstatisticasMunicipios().subscribe(
      (dados) => {
        this.dataSource = dados;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar estatísticas dos municípios:', error);
        this.isLoading = false;
      }
    );

    // Carregar dados gerais
    this.estatisticasService.getEstatisticasGerais().subscribe(
      (gerais) => {
        this.estatisticasGerais = gerais;
      },
      (error) => {
        console.error('Erro ao carregar estatísticas gerais:', error);
      }
    );
  }

  getTotalAdocoes(): number {
    return this.estatisticasGerais.totalAdocoes || 0;
  }

  getTotalCastracoes(): number {
    return this.estatisticasGerais.totalCastracoes || 0;
  }

  getTotalRecolhimentos(): number {
    return this.estatisticasGerais.totalRecolhimentos || 0;
  }

  getMediaTaxaAbandono(): number {
    return this.estatisticasGerais.mediaTaxaAbandono || 0;
  }

}
