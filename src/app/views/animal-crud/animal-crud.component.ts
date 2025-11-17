import { HeaderService } from '../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-animal-crud',
  templateUrl: './animal-crud.component.html',
  styleUrls: ['./animal-crud.component.css']
})
export class AnimalCrudComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router, 
    private headerService: HeaderService,
    private authService: AuthService
  ) {
    headerService.headerData = {
      title: 'Cadastro de Animais',
      icon: 'pets',
      routeUrl: '/animals'
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  navigateToAnimalCreate(): void {
    this.router.navigate(['/animals/create'])
  }

}
