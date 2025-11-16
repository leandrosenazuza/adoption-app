import { Animal } from '../animal.model';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-read',
  templateUrl: './animal-read.component.html',
  styleUrls: ['./animal-read.component.css']
})
export class animalReadComponent implements OnInit {

  animals: Animal[]
  displayedColumns = ['id', 'nome', 'idade', 'action']
  
  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.read().subscribe(animals => {
      this.animals = animals
    })
  }

}
