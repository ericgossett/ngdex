import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PokedexComponent } from './pokedex.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';

import { PokedexService } from './shared/pokedex.service';
import { LoadingComponent } from './shared/loading.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/pokedex',
        pathMatch: 'full'
      },
      {
        path: 'pokedex',
        component: PokemonListComponent,
      },
      {
        path: 'pokedex/pokemon/:id',
        component: PokemonComponent,
      }
    ])
  ],
  declarations: [
    PokedexComponent,
    PokemonListComponent,
    PokemonComponent,
    LoadingComponent
  ],
  providers: [
    PokedexService
  ],
  exports: [
    PokedexComponent
  ]
})
export class PokedexModule { }
