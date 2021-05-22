import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useCharacter from '../../../hooks/useCharacter';
import { getPeopleImageUrl } from '../../../utils';
import PlanetInfoRow from '../../Planets/components/PlanetInfoRow';

export const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 10px;
    height: 110px;
    width: 80px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export default function CharactersInfo({ id }) {
  const info = useCharacter(id);

  const peopleURL = useMemo(() => getPeopleImageUrl(id), [id]);

  return info ? (
    <CharacterWrapper>
      <img src={peopleURL} alt={info.name} className='img-rounded' />
      <Link to={`/characters/${id}`}>{info.name}</Link>
      <InfoWrapper>
        <PlanetInfoRow name='Gender' value={info.gender} />
      </InfoWrapper>
      <InfoWrapper>
        <PlanetInfoRow name='Birth day' value={info.birth_year} />
      </InfoWrapper>
    </CharacterWrapper>
  ) : (
    ''
  );
}
