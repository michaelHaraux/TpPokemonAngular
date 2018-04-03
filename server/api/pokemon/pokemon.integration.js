'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPokemon;

describe('Pokemon API:', function() {
  describe('GET /api/pokemons', function() {
    var pokemons;

    beforeEach(function(done) {
      request(app)
        .get('/api/pokemons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokemons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pokemons.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/pokemons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pokemons')
        .send({
          name: 'New Pokemon',
          info: 'This is the brand new pokemon!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPokemon = res.body;
          done();
        });
    });

    it('should respond with the newly created pokemon', function() {
      newPokemon.name.should.equal('New Pokemon');
      newPokemon.info.should.equal('This is the brand new pokemon!!!');
    });
  });

  describe('GET /api/pokemons/:id', function() {
    var pokemon;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pokemons/${newPokemon._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokemon = res.body;
          done();
        });
    });

    afterEach(function() {
      pokemon = {};
    });

    it('should respond with the requested pokemon', function() {
      pokemon.name.should.equal('New Pokemon');
      pokemon.info.should.equal('This is the brand new pokemon!!!');
    });
  });

  describe('PUT /api/pokemons/:id', function() {
    var updatedPokemon;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pokemons/${newPokemon._id}`)
        .send({
          name: 'Updated Pokemon',
          info: 'This is the updated pokemon!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPokemon = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPokemon = {};
    });

    it('should respond with the updated pokemon', function() {
      updatedPokemon.name.should.equal('Updated Pokemon');
      updatedPokemon.info.should.equal('This is the updated pokemon!!!');
    });

    it('should respond with the updated pokemon on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pokemons/${newPokemon._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pokemon = res.body;

          pokemon.name.should.equal('Updated Pokemon');
          pokemon.info.should.equal('This is the updated pokemon!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pokemons/:id', function() {
    var patchedPokemon;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pokemons/${newPokemon._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pokemon' },
          { op: 'replace', path: '/info', value: 'This is the patched pokemon!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPokemon = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPokemon = {};
    });

    it('should respond with the patched pokemon', function() {
      patchedPokemon.name.should.equal('Patched Pokemon');
      patchedPokemon.info.should.equal('This is the patched pokemon!!!');
    });
  });

  describe('DELETE /api/pokemons/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pokemons/${newPokemon._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pokemon does not exist', function(done) {
      request(app)
        .delete(`/api/pokemons/${newPokemon._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
