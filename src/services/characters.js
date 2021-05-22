const apiHost = process.env.REACT_APP_SW_API_HOST;

class CharactersApiService {
    getCharacters = async page => fetch(`${apiHost}/people/?page=${page}`);

    getCharacter = async id => fetch(`${apiHost}/people/${id}/`);
}
export default new CharactersApiService();
