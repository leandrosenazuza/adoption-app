import { Animal } from '../animal.model';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DemonstrarInteresseComponent } from '../demonstrar-interesse/demonstrar-interesse.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-animal-read',
  templateUrl: './animal-read.component.html',
  styleUrls: ['./animal-read.component.css']
})
export class animalReadComponent implements OnInit {

  animals: Animal[]
  imageError: { [key: number]: boolean } = {}
  isAuthenticated: boolean = false;
  
  constructor(
    private animalService: AnimalService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
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

  abrirFormularioInteresse(animal: Animal): void {
    const dialogRef = this.dialog.open(DemonstrarInteresseComponent, {
      width: '500px',
      data: { 
        animalId: animal.id || 0, 
        animalNome: animal.nome || 'Animal'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Formulário foi submetido com sucesso
        console.log('Interesse registrado para o animal:', animal.nome);
      }
    });
  }

}
