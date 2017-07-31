import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../shared/pokedex.service';

interface PokedexEntry {
  entry_number: number;
  pokemon_species: {
    url: string;
    name: string;
  };
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokedexEntries;
  loading = true;

  constructor(private pokedexService: PokedexService) { }

  loadPokedex() {
    this.pokedexService.subscribeToPokeStream().subscribe(data => {
      this.pokedexEntries = data;
      this.loading = false;
    });
    this.pokedexService.fetchPokedexEntries();
  }

  ngOnInit() {
    console.log('init');
    console.log(this.loading);
    this.loadPokedex();

  }

}
