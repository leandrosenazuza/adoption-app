import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnimalService } from './animal.service';
import { Animal } from './animal.model';
import { environment } from '../../../environments/environment';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [AnimalService]
    });
    service = TestBed.get(AnimalService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an animal', () => {
    const animal: Animal = {
      id: 1,
      nome: 'Rex',
      idade: 3,
      racaId: 1,
      comportamentoId: 1
    };

    service.create(animal).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.nome).toBe('Rex');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/animal/criar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.nome).toBe('Rex');
    expect(req.request.body.idade).toBe(3);
    req.flush(animal);
  });

  it('should read all animals', () => {
    const mockAnimals: Animal[] = [
      { id: 1, nome: 'Rex', idade: 3 },
      { id: 2, nome: 'Luna', idade: 2 }
    ];

    service.read().subscribe(animals => {
      expect(animals.length).toBe(2);
      expect(animals[0].nome).toBe('Rex');
      expect(animals[1].nome).toBe('Luna');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/animal/get/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAnimals);
  });

  it('should read animal by id', () => {
    const animal: Animal = { id: 1, nome: 'Rex', idade: 3 };

    service.readById(1).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.id).toBe(1);
      expect(response.nome).toBe('Rex');
      expect(response.idade).toBe(3);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/animal/get/1`);
    expect(req.request.method).toBe('GET');
    req.flush(animal);
  });

  it('should update an animal', () => {
    const animal: Animal = {
      id: 1,
      nome: 'Rex Atualizado',
      idade: 4,
      racaId: 1
    };

    service.update(animal).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.nome).toBe('Rex Atualizado');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/animal/put/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.nome).toBe('Rex Atualizado');
    req.flush(animal);
  });

  it('should delete an animal', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/animal/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: 1 });
  });
});

