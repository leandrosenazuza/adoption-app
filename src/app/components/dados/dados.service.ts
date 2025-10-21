import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Dados } from "./dados.model";

@Injectable({
  providedIn: "root",
})
export class DadosService {
  baseUrl = "http://localhost:3001/dados";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(dados: Dados): Observable<Dados> {
    return this.http.post<Dados>(this.baseUrl, dados).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Dados[]> {
    return this.http.get<Dados[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Dados> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Dados>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(Dados: Dados): Observable<Dados> {
    const url = `${this.baseUrl}/${Dados.id}`;
    return this.http.put<Dados>(url, Dados).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Dados> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Dados>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
