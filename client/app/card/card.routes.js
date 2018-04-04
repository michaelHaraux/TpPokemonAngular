'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('card', {
      url: '/card',
      template: '<card></card>'
    });
}
