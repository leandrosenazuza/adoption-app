import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Animal } from "./animal.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AnimalService {
  baseUrl = `${environment.apiUrl}/animal`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(animal: Animal): Observable<Animal> {
    // Garante que os campos obrigatórios estejam presentes
    const animalDTO: any = {
      nome: animal.nome,
      idade: animal.idade,
      racaId: animal.racaId || 1,
      comportamentoId: animal.comportamentoId || 1,
      sexo: animal.sexo || 'DESCONHECIDO',
      cirurgiaId: animal.cirurgiaId || null,
      isCastrado: animal.isCastrado !== undefined ? animal.isCastrado : false,
      isVermifugado: animal.isVermifugado !== undefined ? animal.isVermifugado : false,
      isVacinado: animal.isVacinado !== undefined ? animal.isVacinado : false,
      isCirurgia: animal.isCirurgia !== undefined ? animal.isCirurgia : false,
      descricaoAnimal: animal.descricaoAnimal || null,
      foto: animal.foto || null
    };
    return this.http.post<Animal>(`${this.baseUrl}/criar`, animalDTO).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.baseUrl}/get/all`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Animal> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<Animal>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(animal: Animal): Observable<Animal> {
    const url = `${this.baseUrl}/put/${animal.id}`;
    // Garante que os IDs sejam enviados corretamente (caso o backend retorne objetos completos)
    const animalDTO: any = {
      id: animal.id,
      nome: animal.nome,
      idade: animal.idade,
      racaId: (animal as any).raca?.id || animal.racaId || 1,
      comportamentoId: (animal as any).comportamento?.id || animal.comportamentoId || 1,
      sexo: (animal as any).sexo || animal.sexo || 'DESCONHECIDO',
      cirurgiaId: (animal as any).cirurgia?.id || animal.cirurgiaId,
      isCastrado: animal.isCastrado !== undefined ? animal.isCastrado : false,
      isVermifugado: animal.isVermifugado !== undefined ? animal.isVermifugado : false,
      isVacinado: animal.isVacinado !== undefined ? animal.isVacinado : false,
      isCirurgia: animal.isCirurgia !== undefined ? animal.isCirurgia : false,
      descricaoAnimal: animal.descricaoAnimal,
      foto: animal.foto
    };
    return this.http.put<Animal>(url, animalDTO).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Animal> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<Animal>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    let errorMessage = "Ocorreu um erro!";
    if (e.error && e.error.message) {
      errorMessage = e.error.message;
    } else if (e.message) {
      errorMessage = e.message;
    }
    this.showMessage(errorMessage, true);
    console.error("Erro na requisição:", e);
    return EMPTY;
  }
}
