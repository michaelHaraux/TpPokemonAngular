'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var pokemonCtrlStub = {
  index: 'pokemonCtrl.index',
  show: 'pokemonCtrl.show',
  create: 'pokemonCtrl.create',
  upsert: 'pokemonCtrl.upsert',
  patch: 'pokemonCtrl.patch',
  destroy: 'pokemonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pokemonIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pokemon.controller': pokemonCtrlStub
});

describe('Pokemon API Router:', function() {
  it('should return an express router instance', function() {
    pokemonIndex.should.equal(routerStub);
  });

  describe('GET /api/pokemons', function() {
    it('should route to pokemon.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pokemonCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/pokemons/:id', function() {
    it('should route to pokemon.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pokemonCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/pokemons', function() {
    it('should route to pokemon.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pokemonCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/pokemons/:id', function() {
    it('should route to pokemon.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'pokemonCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pokemons/:id', function() {
    it('should route to pokemon.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'pokemonCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pokemons/:id', function() {
    it('should route to pokemon.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pokemonCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
