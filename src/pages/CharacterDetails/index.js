import { useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/Loader';
import ServerError from 'components/ServerError';
// import charactersApiService from "services/characters";

import apiService from 'services/characters';

import { NotificationContext } from '../../components/Notification';
import CharactersInfo, {
  InfoWrapper,
  CharacterWrapper as Cw,
} from './components/CharactersInfo';
import CharacterInfo from './components/CharacterInfo';
import { getPeopleId, getPeopleImageUrl } from '../../utils';
import withCharacter from '../../hoc/withCharacter';
import { errorFetch, startFetch, successFetch } from './state/actions';
import reducer from './state/reducer';
import CharacterInfoRow from '../Characters/components/CharacterInfoRow';

const CharacterWrapper = styled.div`
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

  // const [characterInfo, setCharacterInfo] = useState([]);

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
  //
  // useEffect(() => {
  //   if (!characterInfo?.residents) return;
  //
  //   const peoplePromises = characterInfo?.residents.map(url => {
  //     const peopleId = url.replace(/^[\D]+|\/$/g, '');
  //
  //     return apiService.getCharacter(peopleId).then(res => res.json());
  //   });
  //
  //   (async () => {
  //     let peopleFullInfo = await Promise.allSettled(peoplePromises);
  //
  //     peopleFullInfo = peopleFullInfo
  //       .map(({ status, value }) => {
  //         return status === 'fulfilled' ? value : null;
  //       })
  //       .filter(info => info);
  //
  //     setCharacterInfo(peopleFullInfo);
  //   })();
  // }, [characterInfo?.residents]);
  //
  // /**
  //  * End Show characters all together
  //  */

  if (fetching) return <Loader />;
  if (error) return <ServerError />;
  if (!characterInfo) return '';

  return (
    <div>
      <h1>
        {characterInfo.name}
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

      {/* <h2>Residents</h2>
      <CharacterWrapper>
        {characterInfo.map(url => (
          <CharactersInfo key={url} id={getPeopleId(url)} />
        ))}
        {characterInfo.residents.length === 0 && (
          <p>{characterInfo.name} has no residents</p>
        )}
      </CharacterWrapper> */}

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
                    <CharacterInfoRow name='Gender' value={info.gender} />
                  </InfoWrapper>
                  <InfoWrapper>
                    <CharacterInfoRow name='Birth day' value={info.birth_year} />
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

export default withCharacter(CharacterDetails);
