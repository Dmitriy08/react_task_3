import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


import CharacterInfoRow from './CharacterInfoRow';

const CharacterInfoWrapper = styled.div`
  dt {
    width: 94px;
  }
  dd {
    margin-left: 111px;
  }
`;

export default function CharacterTile({ item, onImageLoadError }) {
  
  return (
    <div className='thumbnail planet-image'>
      <img src={item.imgSrc} alt={item.name} onError={onImageLoadError} />
      <div className='caption'>
        <h3>
          <Link to={`/character/${item.id}`}>{item.name}</Link>
        </h3>
        <CharacterInfoWrapper>
          <dl className='dl-horizontal'>
            <CharacterInfoRow name='Height' value={item.height} />
            <CharacterInfoRow name='Mass' value={`${item.mass} kg`} />
            <CharacterInfoRow name='Hair color' value={item.hair_color} />
            <CharacterInfoRow name='Skin color' value={item.skin_color} />
            <CharacterInfoRow name='Eye color' value={item.eye_color} />
            <CharacterInfoRow name='Birth year' value={item.birth_year} />
            <CharacterInfoRow name='Gender' value={item.gender} />
          </dl>
        </CharacterInfoWrapper>
      </div>
    </div>
  );
}

