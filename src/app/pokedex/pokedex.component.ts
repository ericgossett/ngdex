import { Component, OnInit } from '@angular/core';
import { PokedexService } from './shared/pokedex.service';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  private searchTerms = new Subject<string>();

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    this.searchTerms.debounceTime(300)
      .distinctUntilChanged()
      .subscribe((term) => {
        console.log('searching for ', term);
        this.pokedexService.searchPokemonList(term);
      });
  }

  search(term) {
    console.log('searched');
    this.searchTerms.next(term);
  }
}
