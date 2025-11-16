import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../components/template/header/header.service';
import { IotService, IotData } from '../../services/iot.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-monitoramento-iot',
  templateUrl: './monitoramento-iot.component.html',
  styleUrls: ['./monitoramento-iot.component.css']
})
export class MonitoramentoIotComponent implements OnInit, OnDestroy {
  dadosIot: IotData[] = [];
  isLoading: boolean = true;
  private updateSubscription: Subscription;

  constructor(
    private headerService: HeaderService,
    private iotService: IotService
  ) {
    headerService.headerData = {
      title: 'Monitoramento IoT',
      icon: 'sensors',
      routeUrl: '/monitoramento-iot'
    }
  }

  ngOnInit(): void {
    this.carregarDadosIot();
    // Atualizar dados a cada 5 segundos
    this.updateSubscription = interval(5000).subscribe(() => {
      this.carregarDadosIot();
    });
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  carregarDadosIot(): void {
    this.isLoading = true;
    // Buscar 3 sensores diferentes
    this.iotService.getDadosIotMultiplos(3).subscribe(
      (dados) => {
        this.dadosIot = dados;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar dados IoT:', error);
        this.isLoading = false;
      }
    );
  }

  formatarTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR');
  }
}
