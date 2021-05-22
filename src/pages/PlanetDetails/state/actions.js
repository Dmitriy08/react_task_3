const startFetch = () => ({
  type: 'START_FETCH_PLANET',
});
const errorFetch = () => ({
  type: 'FAILURE_FETCH_PLANET',
});
const successFetch = planetInfo => ({
  type: 'SUCCES_FETCH_PLANET',
  payload: planetInfo,
});

export { startFetch, errorFetch, successFetch };
