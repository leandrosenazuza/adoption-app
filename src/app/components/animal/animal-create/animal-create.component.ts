import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RacaService, Raca } from '../raca.service';
import { ComportamentoService, Comportamento } from '../comportamento.service';
import { CirurgiaService, Cirurgia } from '../cirurgia.service';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

  animal: Animal = {
    nome: '',
    idade: 0,
    racaId: undefined,
    comportamentoId: undefined,
    sexo: 'DESCONHECIDO',
    cirurgiaId: undefined,
    isCastrado: false,
    isVermifugado: false,
    isVacinado: false,
    isCirurgia: false,
    descricaoAnimal: '',
    foto: ''
  }

  racas: Raca[] = [];
  comportamentos: Comportamento[] = [];
  cirurgias: Cirurgia[] = [];
  sexos: string[] = ['MACHO', 'FEMEA', 'DESCONHECIDO'];
  
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploading: boolean = false;

  constructor(
    private animalService: AnimalService,
    private racaService: RacaService,
    private comportamentoService: ComportamentoService,
    private cirurgiaService: CirurgiaService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Carregar opções dos selects
    this.racaService.getAll().subscribe(racas => this.racas = racas);
    this.comportamentoService.getAll().subscribe(comportamentos => this.comportamentos = comportamentos);
    this.cirurgiaService.getAll().subscribe(cirurgias => this.cirurgias = cirurgias);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.match(/image\/*/)) {
        this.animalService.showMessage('Por favor, selecione apenas arquivos de imagem!');
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.animalService.showMessage('A imagem deve ter no máximo 5MB!');
        return;
      }

      this.selectedFile = file;
      
      // Criar preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createAnimal(): void {
    // Define isCirurgia baseado na existência de cirurgiaId
    this.animal.isCirurgia = this.animal.cirurgiaId != null && this.animal.cirurgiaId !== undefined;
    
    // Se houver arquivo selecionado, fazer upload primeiro
    if (this.selectedFile) {
      this.isUploading = true;
      this.imageUploadService.uploadImage(this.selectedFile).subscribe(
        (filename: string) => {
          this.animal.foto = filename;
          this.saveAnimal();
        },
        (error) => {
          this.isUploading = false;
          this.animalService.showMessage('Erro ao fazer upload da imagem: ' + (error.error || error.message));
        }
      );
    } else {
      // Se não houver arquivo, salvar diretamente (pode ter URL ou estar vazio)
      this.saveAnimal();
    }
  }

  private saveAnimal(): void {
    this.animalService.create(this.animal).subscribe(() => {
      this.animalService.showMessage('Animal criado com sucesso!')
      this.router.navigate(['/animals'])
    }, (error) => {
      this.isUploading = false;
    })
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.animal.foto = '';
  }

  cancel(): void {
    this.router.navigate(['/animals'])
  }
}
