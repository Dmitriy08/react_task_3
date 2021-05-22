import {
  FETCH_CHARACTERS_STARTED,
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_SUCCESS,
} from "actions/types";

const initialState = {
  characters: null,
  fetchingCharacters: false,
  charactersError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHARACTERS_STARTED: {
      return {
        ...state,
        fetchingCharacters: true,
        charactersError: false,
      };
    }
    case FETCH_CHARACTERS_FAILURE: {
      return {
        ...state,
        fetchingCharacters: false,
        charactersError: true,
      };
    }
    case FETCH_CHARACTERS_SUCCESS: {
      return {
        ...state,
        fetchingCharacters: false,
        characters: action.payload,
      };
    }

    default:
      return state;
  }
}
