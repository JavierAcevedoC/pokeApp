import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokeService } from 'src/app/services/poke.service';
import { Pokemon } from 'src/app/shared/types/pokedata.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.css']
})
export class PokeTableComponent implements OnInit {

  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  displayedColumns: string[] = ['position', 'image', 'name'];

  constructor(
    private pokeService: PokeService,
    private router: Router
  ) {
    
  }
  

  ngOnInit(): void {
    this.getPokemons();
  }

  public searchPokemon(event: Event): void {
    const search = (event.target as HTMLInputElement).value;
    this.dataSource.filter = search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public getPokemons(): void {
    for (let i = 1; i < environment.QUANTITY_POKEMON; i++) {
      this.pokeService.getPokemon(i).subscribe(
        (response) => {

        const pokemonData: Pokemon = {
          position: response.id,
          image: response.sprites.front_default,
          name: response.name
        }; 

        this.data.push(pokemonData);
        this.dataSource = new MatTableDataSource<any>(this.data);
      });
    }
  }

  public goToDetail(pokemonRow: Pokemon): void {
    this.router.navigateByUrl("/pokeDetail/" + pokemonRow.position);
  }
}
