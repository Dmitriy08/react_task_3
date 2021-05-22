const startFetch = () => ({
  type: 'START_FETCH_STAR_SHIP',
});
const errorFetch = () => ({
  type: 'FAILURE_FETCH_STAR_SHIP',
});
const successFetch = starShipInfo => ({
  type: 'SUCCES_FETCH_STAR_SHIP',
  payload: starShipInfo,
});

export { startFetch, errorFetch, successFetch };
