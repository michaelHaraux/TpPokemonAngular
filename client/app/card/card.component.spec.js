'use strict';

describe('Component: CardComponent', function() {
  // load the controller's module
  beforeEach(module('pokemonTcgApp.card'));

  var CardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CardComponent = $componentController('card', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
