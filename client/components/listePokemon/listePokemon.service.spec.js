'use strict';

describe('Service: listePokemon', function() {
  // load the service's module
  beforeEach(module('pokemonTcgApp.listePokemon'));

  // instantiate service
  var listePokemon;
  beforeEach(inject(function(_listePokemon_) {
    listePokemon = _listePokemon_;
  }));

  it('should do something', function() {
    expect(!!listePokemon).toBe(true);
  });
});
