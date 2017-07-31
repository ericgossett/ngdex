import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PokedexService } from '../shared/pokedex.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  providers: [
    PokedexService
  ]
})
export class PokemonComponent implements OnInit {

  loading = true;

  constructor(
    private pokedexService: PokedexService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  pokemon = {};
  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.pokedexService.getPokemon(params.get('id'))
    ).subscribe((data) => {
      this.pokemon = data;
      this.loading = false;
    });
  }

}
