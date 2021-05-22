
const reducer = (state, action) => {
  switch (action.type) {
    case 'START_FETCH_PLANET':
      return { ...state, fetching: true, error: false };
    case 'FAILURE_FETCH_PLANET':
      return { ...state, fetching: false, error: true };
    case 'SUCCES_FETCH_PLANET':
      return {
        fetching: false,
        error: false,
        planetInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
