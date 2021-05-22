import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { loadCharacters } from 'actions/characters';

import Loader from 'components/Loader';
import Pager from 'components/Pager';
import ServerError from 'components/ServerError';
import CharacterTile from './components/CharacterTile';
import { getDefaultImage, getPeopleId, getPeopleImageUrl } from '../../utils';

const defaultImageUrl = getDefaultImage();

const CharactersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  align-items: stretch;
  align-content: flex-start;
  justify-content: flex-start;
  > div {
    flex-grow: 1;
    width: 300px;
    &:last-of-type {
      flex-grow: 0;
    }
  }
`;

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, fetchingCharacters, charactersError } = useSelector(
    state => state.characters
  );

  const [page, setPage] = useState(1);

  const onImageLoadError = useCallback(e => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
      e.target.classList.add('img-placeholder');
    }
  }, []);

  const { next, previous, results: list } = characters || {};

  const handleClickNext = e => {
    e.preventDefault();
    if (next) setPage(page + 1);
  };
  const handleClickPrev = e => {
    e.preventDefault();
    if (previous) setPage(page - 1);
  };

  useEffect(() => {
    dispatch(loadCharacters(page));

  }, [page, dispatch]);

  return (
    <div>
      <h1>Star Wars Characters</h1>

      {fetchingCharacters && <Loader />}

      {charactersError && <ServerError />}
      {!charactersError && !fetchingCharacters && list && (
        <>
          <CharactersWrapper>
            {list.map(item => {
              const cloneItem = { ...item };
              cloneItem.id = getPeopleId(item.url);
              cloneItem.imgSrc = getPeopleImageUrl(cloneItem.id);

              return (
                <CharacterTile
                  key={cloneItem.name}
                  item={cloneItem}
                  onImageLoadError={onImageLoadError}
                />
              );
            })}
          </CharactersWrapper>

          <Pager
            previous={previous}
            next={next}
            handleClickPrev={handleClickPrev}
            handleClickNext={handleClickNext}
          />
        </>
      )}
    </div>
  );
};

export default Characters;
