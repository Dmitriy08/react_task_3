import { combineReducers } from 'redux'

import planetsReducer from "./planets";
import charactersReducer from "./characters";

export default combineReducers({
  planets: planetsReducer,
  characters: charactersReducer,
});
