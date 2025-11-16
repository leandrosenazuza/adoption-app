import { Animal } from "../animal.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AnimalService } from "../animal.service";
import { Component, OnInit } from "@angular/core";
import { RacaService, Raca } from "../raca.service";
import { ComportamentoService, Comportamento } from "../comportamento.service";
import { CirurgiaService, Cirurgia } from "../cirurgia.service";
import { ImageUploadService } from '../image-upload.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: "app-animal-update",
  templateUrl: "./animal-update.component.html",
  styleUrls: ["./animal-update.component.css"],
})
export class AnimalUpdateComponent implements OnInit {
  animal: Animal;
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    
    // Carregar dados do animal
    this.animalService.readById(id).subscribe((animal) => {
      this.animal = animal;
      // Extrair IDs dos objetos relacionados se vierem do backend
      if ((animal as any).raca?.id) {
        this.animal.racaId = (animal as any).raca.id;
      }
      if ((animal as any).comportamento?.id) {
        this.animal.comportamentoId = (animal as any).comportamento.id;
      }
      if ((animal as any).cirurgia?.id) {
        this.animal.cirurgiaId = (animal as any).cirurgia.id;
        this.animal.isCirurgia = true;
      } else {
        this.animal.cirurgiaId = null;
        this.animal.isCirurgia = false;
      }
      if ((animal as any).sexo) {
        this.animal.sexo = (animal as any).sexo;
      }
      // Garantir valores padrão para campos booleanos
      if (this.animal.isCastrado === undefined) this.animal.isCastrado = false;
      if (this.animal.isVermifugado === undefined) this.animal.isVermifugado = false;
      if (this.animal.isVacinado === undefined) this.animal.isVacinado = false;
      
      // Carregar preview da imagem atual se existir
      if (this.animal.foto) {
        if (this.animal.foto.startsWith('http')) {
          this.imagePreview = this.animal.foto;
        } else {
          this.imagePreview = `${environment.apiUrl}/images/${this.animal.foto}`;
        }
      }
    });

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

  updateAnimal(): void {
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
      // Se não houver arquivo novo, salvar diretamente (mantém foto atual ou URL)
      this.saveAnimal();
    }
  }

  private saveAnimal(): void {
    this.animalService.update(this.animal).subscribe(() => {
      this.animalService.showMessage("Animal atualizado com sucesso!");
      this.router.navigate(["/animals"]);
    }, (error) => {
      this.isUploading = false;
    });
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.animal.foto = '';
  }

  cancel(): void {
    this.router.navigate(["/animals"]);
  }
}
