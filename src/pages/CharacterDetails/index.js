import { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/Loader';
import ServerError from 'components/ServerError';
// import charactersApiService from "services/characters";

import apiService from 'services/starships';

import { NotificationContext } from '../../components/Notification';
import StarshipsInfo, {
  InfoWrapper,
  StarShipsWrapper as Sw,
} from './components/StarshipsInfo';
import CharacterInfo from './components/CharacterInfo';
import {getPeopleId, getPeopleImageUrl, getStarShipId, getStarShipImageUrl} from '../../utils';
import withCharacter from '../../hoc/withCharacter';
import { errorFetch, startFetch, successFetch } from './state/actions';
import reducer from './state/reducer';
import CharacterInfoRow from '../Characters/components/CharacterInfoRow';

const StarShipsWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const NextCharacterLinkWrapper = styled.div`
  float: right;
  display: inline-block;
  line-height: 39px;
  a {
    text-decoration: none;
  }
`;

const initialState = {
  fetching: false,
  error: false,
  characterInfo: null,
};

const CharacterDetails = ({ getData }) => {
  const { id } = useParams();
  // const [characterInfo, setCharacterInfo] = useState(null);
  // const [fetchStatus, setFetchStatus] = useState({
  //   fetching: false,
  //   error: false,
  // });

  const notificationContext = useContext(NotificationContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [starshipInfo, setStarshipInfo] = useState([]);

  // const { fetching, error, characterInfo } = fetchStatus;
  const { fetching, error, characterInfo } = state;

  useEffect(() => {
    (async () => {
      dispatch(startFetch());

      try {
        // const info = await charactersApiService.getCharacter(id).then((res) => res.json());
        const info = await getData(id).then(res => res.json());
        notificationContext.showInfo(`${info.name} Fetched`);
        dispatch(successFetch(info));
      } catch {
        dispatch(errorFetch());
      }
    })();
  }, [id]);

  /**
   * Show characters all together
   */

  useEffect(() => {
    if (!characterInfo?.starships) return;

    const starShipPromises = characterInfo?.starships.map(url => {
      const starShipId = url.replace(/^[\D]+|\/$/g, '');

      return apiService.getStarShip(starShipId).then(res => res.json());
    });

    (async () => {
      let peopleFullInfo = await Promise.allSettled(starShipPromises);

      peopleFullInfo = peopleFullInfo
        .map(({ status, value }) => {
          return status === 'fulfilled' ? value : null;
        })
        .filter(info => info);

      setStarshipInfo(peopleFullInfo);
    })();
  }, [characterInfo?.starships]);

  /**
   * End Show characters all together
   */

  if (fetching) return <Loader />;
  if (error) return <ServerError />;
  if (!characterInfo) return '';

  return (
    <div>
      <h1>
        {starshipInfo.name}
        <NextCharacterLinkWrapper>
          <Link to={`/character/${+id + 1}`}>&rarr;</Link>
        </NextCharacterLinkWrapper>

        {/* // subscribe for context changes */}
        <small style={{ fontSize: 12, paddingLeft: 20 }}>
          <NotificationContext.Consumer>
            {value => (value.message ? `MESSAGE: ${value.message}` : '')}
          </NotificationContext.Consumer>
        </small>
      </h1>
      <CharacterInfo id={id} character={characterInfo} />

      {starshipInfo.length > 0 && (
        <>
          <h2>Residents</h2>
          <StarShipsWrapper>
            {starshipInfo.map(info => {
              const id = getStarShipId(info.url);
              const peopleURL = getStarShipImageUrl(id);

              return (
                <Sw key={id}>
                  <img
                    src={peopleURL}
                    alt={info.name}
                    className='img-rounded'
                  />
                  <Link to={`/starship/${id}`}>{info.name}</Link>
                  <InfoWrapper>
                    <CharacterInfoRow name='Model' value={info.model} />
                  </InfoWrapper>
                  <InfoWrapper>
                    <CharacterInfoRow name='Manufacturer' value={info.manufacturer} />
                  </InfoWrapper>
                </Sw>
              );
            })}
          </StarShipsWrapper>
        </>
      )}
    </div>
  );
};

export default withCharacter(CharacterDetails);
