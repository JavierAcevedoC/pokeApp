import { HttpErrorResponse, HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from 'src/app/services/poke.service';
import { Pokemon } from 'src/app/shared/types/pokedata.type';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {
  
  public pokemon: Pokemon & any;
  public isError: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private pokeService: PokeService
    ) {

      this.isError = false;

      this.pokemon = {
        name: 'Pika',
        image: 'a.png',
        type: 'Electrico',
        position: 1
      };

    //obtiene parametro de la url
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    );
  }

  ngOnInit(): void {
  }

  public getPokemon(id: number): void {
    this.pokeService.getPokemon(id).subscribe(
        (res) => {

          console.dir(res);

          this.pokemon = res;
          this.pokemon.image = res.sprites.front_default;
          this.pokemon.type = res.types[0].type.name;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          err.status === HttpStatusCode.NotFound ? this.isError = true : this.isError = false;
        }
    );
  }

}
