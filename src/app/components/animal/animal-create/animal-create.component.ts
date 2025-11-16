import { Animal } from '../animal.model';
import { AnimalService } from '../animal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RacaService, Raca } from '../raca.service';
import { ComportamentoService, Comportamento } from '../comportamento.service';
import { CirurgiaService, Cirurgia } from '../cirurgia.service';

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

  constructor(
    private animalService: AnimalService,
    private racaService: RacaService,
    private comportamentoService: ComportamentoService,
    private cirurgiaService: CirurgiaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Carregar opções dos selects
    this.racaService.getAll().subscribe(racas => this.racas = racas);
    this.comportamentoService.getAll().subscribe(comportamentos => this.comportamentos = comportamentos);
    this.cirurgiaService.getAll().subscribe(cirurgias => this.cirurgias = cirurgias);
  }

  createAnimal(): void {
    // Define isCirurgia baseado na existência de cirurgiaId
    this.animal.isCirurgia = this.animal.cirurgiaId != null && this.animal.cirurgiaId !== undefined;
    
    this.animalService.create(this.animal).subscribe(() => {
      this.animalService.showMessage('Animal criado com sucesso!')
      this.router.navigate(['/animals'])
    })
  }

  cancel(): void {
    this.router.navigate(['/animals'])
  }
}
