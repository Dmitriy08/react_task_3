import { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'components/Loader';
import ServerError from 'components/ServerError';
import apiService from 'services/planets';

import { NotificationContext } from '../../components/Notification';
import CharactersInfo, {
  InfoWrapper,
  CharacterWrapper as Cw,
} from './components/CharactersInfo';
import PlanetInfo from './components/PlanetInfo';
import { getPeopleId, getPeopleImageUrl } from '../../utils';
import withPlanet from '../../hoc/withPlanet';
import { errorFetch, startFetch, successFetch } from './state/actions';
import reducer from './state/reducer';
import PlanetInfoRow from '../Planets/components/PlanetInfoRow';

const CharacterWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const NextPlanetLinkWrapper = styled.div`
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
  planetInfo: null,
};

const PlanetDetails = ({ getData }) => {
  const { id } = useParams();

  const notificationContext = useContext(NotificationContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [characterInfo, setCharacterInfo] = useState([]);

  // const { fetching, error, planetInfo } = fetchStatus;
  const { fetching, error, planetInfo } = state;

  useEffect(() => {
    (async () => {
      dispatch(startFetch());

      try {
        // const info = await planetsApiService.getPlanet(id).then((res) => res.json());
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
    if (!planetInfo?.residents) return;

    const peoplePromises = planetInfo?.residents.map(url => {
      const peopleId = url.replace(/^[\D]+|\/$/g, '');

      return apiService.getCharacter(peopleId).then(res => res.json());
    });

    (async () => {
      let peopleFullInfo = await Promise.allSettled(peoplePromises);

      peopleFullInfo = peopleFullInfo
        .map(({ status, value }) => {
          return status === 'fulfilled' ? value : null;
        })
        .filter(info => info);

      setCharacterInfo(peopleFullInfo);
    })();
  }, [planetInfo?.residents]);

  /**
   * End Show characters all together
   */

  if (fetching) return <Loader />;
  if (error) return <ServerError />;
  if (!planetInfo) return '';

  return (
    <div>
      <h1>
        {characterInfo.name}
        <NextPlanetLinkWrapper>
          <Link to={`/planet/${+id + 1}`}>&rarr;</Link>
        </NextPlanetLinkWrapper>

        {/* // subscribe for context changes */}
        <small style={{ fontSize: 12, paddingLeft: 20 }}>
          <NotificationContext.Consumer>
            {value => (value.message ? `MESSAGE: ${value.message}` : '')}
          </NotificationContext.Consumer>
        </small>
      </h1>
      <PlanetInfo id={id} planet={planetInfo} />

      {characterInfo.length > 0 && (
        <>
          <h2>Residents</h2>
          <CharacterWrapper>
            {characterInfo.map(info => {
              const id = getPeopleId(info.url);
              const peopleURL = getPeopleImageUrl(id);

              return (
                <Cw key={id}>
                  <img
                    src={peopleURL}
                    alt={info.name}
                    className='img-rounded'
                  />
                  <Link to={`/character/${id}`}>{info.name}</Link>
                  <InfoWrapper>
                    <PlanetInfoRow name='Gender' value={info.gender} />
                  </InfoWrapper>
                  <InfoWrapper>
                    <PlanetInfoRow name='Birth day' value={info.birth_year} />
                  </InfoWrapper>
                </Cw>
              );
            })}
          </CharacterWrapper>
        </>
      )}
    </div>
  );
};

export default withPlanet(PlanetDetails);
