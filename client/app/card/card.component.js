'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './card.routes';

export class CardComponent {
  /*@ngInject*/
  constructor(listePokemon) {
    'ngInject';
    this.listePokemon=listePokemon;
  }

  $onInit(){
console.log('je suis on init');
  this.listePokemon.query().$promise.then(data=>this.test = data);
}

}

export default angular.module('pokemonTcgApp.card', [uiRouter])
  .config(routes)
  .component('card', {
    template: require('./card.html'),
    controller: CardComponent,
    controllerAs: 'cardCtrl'
  })
  .name;
