
const reducer = (state, action) => {
  switch (action.type) {
    case 'START_FETCH_CHARACTER':
      return { ...state, fetching: true, error: false };
    case 'FAILURE_FETCH_CHARACTER':
      return { ...state, fetching: false, error: true };
    case 'SUCCES_FETCH_CHARACTER':
      return {
        fetching: false,
        error: false,
        characterInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
