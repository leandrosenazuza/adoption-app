import { HeaderService } from '../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-animal-crud',
  templateUrl: './animal-crud.component.html',
  styleUrls: ['./animal-crud.component.css']
})
export class AnimalCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Animais',
      icon: 'pets',
      routeUrl: '/animals'
    }
  }

  ngOnInit(): void {
  }

  navigateToAnimalCreate(): void {
    this.router.navigate(['/animals/create'])
  }

}
