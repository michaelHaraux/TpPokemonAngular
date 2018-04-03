'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './pokemon.events';

var PokemonSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PokemonSchema);
export default mongoose.model('Pokemon', PokemonSchema);
