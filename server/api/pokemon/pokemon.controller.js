/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pokemons              ->  index
 * POST    /api/pokemons              ->  create
 * GET     /api/pokemons/:id          ->  show
 * PUT     /api/pokemons/:id          ->  upsert
 * PATCH   /api/pokemons/:id          ->  patch
 * DELETE  /api/pokemons/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Pokemon from './pokemon.model';
const pokemon = require('pokemontcgsdk');


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Pokemons
export function index(req, res) {
  return pokemon.card.where({ supertype: 'pokemon'})
.then(cards => {
    console.log(cards); // "M Sceptile-EX"
    res.json(cards);
})
}

// Gets a single Pokemon from the DB
export function show(req, res) {
  return Pokemon.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Pokemon in the DB
export function create(req, res) {
  return Pokemon.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Pokemon in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokemon.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Pokemon in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokemon.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Pokemon from the DB
export function destroy(req, res) {
  return Pokemon.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
