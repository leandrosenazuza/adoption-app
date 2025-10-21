import { Dados } from '../dados.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DadosReadDataSource } from './dados-read-datasource';

@Component({
  selector: 'app-dados-read',
  templateUrl: './dados-read.component.html',
  styleUrls: ['./dados-read.component.css']
})
export class DadosReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Dados>;
  dataSource: DadosReadDataSource;

  displayedColumns = ['id', 'name', 'price'];

  ngOnInit() {
    this.dataSource = new DadosReadDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
