import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import VersionInfo from './pokes.json';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.css']
})
export class PokeTableComponent implements OnInit {

  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  displayedColumns: string[] = ['position', 'image', 'name'];

  constructor() { 
  }
  

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons() {
    let pokemonData;
    var i = 0;
    console.log('getPokemons');
    for (let poke of VersionInfo.results) {
      pokemonData = {
        position: i,
        image: poke.name[0],
        name: poke.name
      }
      this.data.push(pokemonData);
      this.dataSource = new MatTableDataSource<any>(this.data);
      console.log(pokemonData);
      i = i + 1;

    }
  }
}
