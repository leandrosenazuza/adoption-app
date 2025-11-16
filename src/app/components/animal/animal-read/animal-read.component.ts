import { Animal } from '../animal.model';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-animal-read',
  templateUrl: './animal-read.component.html',
  styleUrls: ['./animal-read.component.css']
})
export class animalReadComponent implements OnInit {

  animals: Animal[]
  imageError: { [key: number]: boolean } = {}
  
  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.read().subscribe(
      animals => {
        this.animals = animals;
        console.log('Animais carregados:', animals);
        if (animals && animals.length > 0) {
          animals.forEach(animal => {
            console.log(`Animal ${animal.id} - Foto:`, animal.foto);
          });
        }
      },
      error => {
        console.error('Erro ao carregar animais:', error);
        this.animals = [];
      }
    );
  }

  getImageUrl(foto: string): string {
    if (!foto) {
      return null;
    }
    
    if (foto.startsWith('http://') || foto.startsWith('https://')) {
      return foto;
    }
    
    const imageUrl = `${environment.apiUrl}/images/${foto}`;
    console.log('Construindo URL da imagem:', imageUrl);
    return imageUrl;
  }

  onImageError(animalId: number, event: any): void {
    console.error(`Erro ao carregar imagem do animal ${animalId}:`, event);
    this.imageError[animalId] = true;
  }

}
