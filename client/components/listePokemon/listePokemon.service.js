'use strict';
const angular = require('angular');
import ngResource from 'angular-resource';


/*@ngInject*/
export function listePokemonService($resource) {
  'ngInject';
  return $resource('api/pokemons', {'update': {method:'PUT'} });
}


export default angular.module('pokemonTcgApp.listePokemon', [ngResource])
  .factory('listePokemon', listePokemonService)
  .name;
