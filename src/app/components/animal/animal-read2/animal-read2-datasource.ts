import { Animal } from '../animal.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { AnimalService } from '../animal.service';

export class animalRead2DataSource extends DataSource<Animal> {
  data: Animal[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  private dataSubject = new BehaviorSubject<Animal[]>([]);

  constructor(private animalService: AnimalService) {
    super();
    this.loadData();
  }

  loadData(): void {
    this.animalService.read().subscribe(data => {
      this.data = data;
      this.dataSubject.next(data);
    });
  }

  connect(): Observable<Animal[]> {
    const dataMutations = [
      this.dataSubject.asObservable(),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Animal[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  private getSortedData(data: Animal[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'idade': return compare(+a.idade, +b.idade, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
