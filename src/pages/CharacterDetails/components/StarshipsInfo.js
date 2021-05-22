import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useCharacter from '../../../hooks/useCharacter';
import { getStarShipImageUrl } from '../../../utils';

import StarShipInfo from "../../StarShipsDetails/components/StarShipInfo";

export const StarShipsWrapper = styled.div`
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

export default function StarshipsInfo({ id }) {
  const info = useCharacter(id);

  const peopleURL = useMemo(() => getStarShipImageUrl(id), [id]);

  return info ? (
    <StarShipsWrapper>
      <img src={peopleURL} alt={info.name} className='img-rounded' />
      <Link to={`/starship/${id}`}>{info.name}</Link>
      <InfoWrapper>
        <StarShipInfo name='Gender' value={info.gender} />
      </InfoWrapper>
      <InfoWrapper>
        <StarShipInfo name='Birth day' value={info.birth_year} />
      </InfoWrapper>
    </StarShipsWrapper>
  ) : (
    ''
  );
}
