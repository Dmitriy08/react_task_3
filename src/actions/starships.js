import {
  FETCH_STAR_SHIPS_STARTED,
  FETCH_STAR_SHIPS_FAILURE,
  FETCH_STAR_SHIPS_SUCCESS,
} from "./types";

import starShipsApiService from "../services/starships";

const loadStarShipsSuccess = (startShips) => ({
  type: FETCH_STAR_SHIPS_SUCCESS,
  payload: {
    ...startShips,
  },
});

const loadStarShipsStarted = () => ({
  type: FETCH_STAR_SHIPS_STARTED,
});

const loadStarShipsFailure = () => ({
  type: FETCH_STAR_SHIPS_FAILURE,
});

export const loadStarShips = (page = 1) => async (dispatch) => {
  dispatch(loadStarShipsStarted());

  try {
    const starShips = await starShipsApiService
      .getStarShips(page)
      .then((res) => res.json());
    dispatch(loadStarShipsSuccess(starShips));
  } catch {
    dispatch(loadStarShipsFailure());
  }
};
