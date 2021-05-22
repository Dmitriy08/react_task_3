const apiHost = process.env.REACT_APP_SW_API_HOST;

class StarShipsApiService {
  getStarShips = async page => fetch(`${apiHost}/starships/?page=${page}`);
  getStarShip = async id => fetch(`${apiHost}/starships/${id}/`);
}
export default new StarShipsApiService();
