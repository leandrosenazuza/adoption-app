import { Animal } from "../animal.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AnimalService } from "../animal.service";
import { Component, OnInit } from "@angular/core";
import { RacaService, Raca } from "../raca.service";
import { ComportamentoService, Comportamento } from "../comportamento.service";
import { CirurgiaService, Cirurgia } from "../cirurgia.service";

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

  constructor(
    private animalService: AnimalService,
    private racaService: RacaService,
    private comportamentoService: ComportamentoService,
    private cirurgiaService: CirurgiaService,
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
    });

    // Carregar opções dos selects
    this.racaService.getAll().subscribe(racas => this.racas = racas);
    this.comportamentoService.getAll().subscribe(comportamentos => this.comportamentos = comportamentos);
    this.cirurgiaService.getAll().subscribe(cirurgias => this.cirurgias = cirurgias);
  }

  updateAnimal(): void {
    // Define isCirurgia baseado na existência de cirurgiaId
    this.animal.isCirurgia = this.animal.cirurgiaId != null && this.animal.cirurgiaId !== undefined;
    
    this.animalService.update(this.animal).subscribe(() => {
      this.animalService.showMessage("Animal atualizado com sucesso!");
      this.router.navigate(["/animals"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/animals"]);
  }
}
