import { HeaderService } from '../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dados-crud',
  templateUrl: './dados-crud.component.html',
  styleUrls: ['./dados-crud.component.css']
})
export class DadosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Dados de animals',
      icon: 'info',
      routeUrl: '/dados'
    }
  }

  ngOnInit(): void {
  }

  navigateToDadosCreate(): void {
    this.router.navigate(['/dados'])
  }

}
