const startFetch = () => ({
  type: 'START_FETCH_CHARACTER',
});
const errorFetch = () => ({
  type: 'FAILURE_FETCH_CHARACTER',
});
const successFetch = characterInfo => ({
  type: 'SUCCES_FETCH_CHARACTER',
  payload: characterInfo,
});

export { startFetch, errorFetch, successFetch };
