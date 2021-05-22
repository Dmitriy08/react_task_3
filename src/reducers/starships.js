import {
  FETCH_STAR_SHIPS_STARTED,
  FETCH_STAR_SHIPS_FAILURE,
  FETCH_STAR_SHIPS_SUCCESS,
} from "actions/types";

const initialState = {
  starships: null,
  fetchingStarShips: false,
  starshipsError: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAR_SHIPS_STARTED: {
      return {
        ...state,
        fetchingStarShips: true,
        starshipsError: false,
      };
    }
    case FETCH_STAR_SHIPS_FAILURE: {
      return {
        ...state,
        fetchingStarShips: false,
        starshipsError: true,
      };
    }
    case FETCH_STAR_SHIPS_SUCCESS: {
      return {
        ...state,
        fetchingStarShips: false,
        starships: action.payload,
      };
    }

    default:
      return state;
  }
}
