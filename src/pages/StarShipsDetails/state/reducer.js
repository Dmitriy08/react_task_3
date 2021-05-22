
const reducer = (state, action) => {
  switch (action.type) {
    case 'START_FETCH_STAR_SHIP':
      return { ...state, fetching: true, error: false };
    case 'FAILURE_FETCH_STAR_SHIP':
      return { ...state, fetching: false, error: true };
    case 'SUCCES_FETCH_STAR_SHIP':
      return {
        fetching: false,
        error: false,
        starShipInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
