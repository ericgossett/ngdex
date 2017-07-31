import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

interface PokedexEntry {
  entry_number: number;
  pokemon_species: {
    url: string;
    name: string;
  };
}

@Injectable()
export class PokedexService {
  pokedex_endpoint = 'http://pokeapi.co/api/v2/pokedex/2/';
  pokemon_endpoint = 'https://pokeapi.co/api/v2/pokemon-species/';
  constructor(private http: Http) {}

  cachedPokemonList: PokedexEntry[];
  filteredPokemonList: PokedexEntry[];

  subject = new Subject();

  /*
  getPokemonList() {
    if (this.cachedPokemonList) {
      console.log('cached ', this.cachedPokemonList);
      this.subject.next(this.cachedPokemonList);
    } else {
      console.log('here');
      this.http.get(this.pokedex_endpoint)
      .map((res: Response) => {
            const json_res = res.json();
            return json_res['pokemon_entries'];
      })
      .subscribe((data) => {
        this.cachedPokemonList = data;
        this.subject.next(data);
      });
    }
    return this.subject.asObservable();
  }
  */

  subscribeToPokeStream() {
    return this.subject.asObservable();
  }


  fetchPokedexEntries() {
    if (this.cachedPokemonList) {
      if (this.filteredPokemonList !== this.cachedPokemonList) {
          console.log(this.filteredPokemonList);
          this.subject.next(this.filteredPokemonList);
      } else {
        this.subject.next(this.cachedPokemonList);
      }
    } else {
      console.log('here');
      this.http.get(this.pokedex_endpoint)
      .map((res: Response) => {
            const json_res = res.json();
            return json_res['pokemon_entries'];
      })
      .subscribe((data) => {
        this.cachedPokemonList = data;
        this.filteredPokemonList = data;
        this.subject.next(data);
      });
    }
  }


  searchPokemonList(name) {
    this.filteredPokemonList = this.cachedPokemonList.filter((entry) => {
      const searchTerm = name.toLowerCase();
      if (entry.pokemon_species.name.toLowerCase().search(searchTerm) !== -1 ) {
        return entry;
      }
    });
    this.subject.next(this.filteredPokemonList);
  }

  getList() {
    return this.cachedPokemonList;
  }

  getPokemon(id) {
    return this.http.get(this.pokemon_endpoint + id).map((res: Response) => {
      const json_res = res.json();
      return json_res;
    });
  }

}
