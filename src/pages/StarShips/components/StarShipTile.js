import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import withPlanet from '../../../hoc/withPlanet';

import StarShipInfoRow from './StarShipInfoRow';

const StarShipInfoWrapper = styled.div`
  dt {
    width: 94px;
  }

  dd {
    margin-left: 111px;
  }
`;

export default function StarShipTile({item, onImageLoadError}) {

	return (
		<div className='thumbnail planet-image'>
			<img src={item.imgSrc} alt={item.name} onError={onImageLoadError}/>
			<div className='caption'>
				<h3>
					<Link to={`/starship/${item.id}`}>{item.name}</Link>
				</h3>
				<StarShipInfoWrapper>

					<dl className='dl-horizontal'>
						<StarShipInfoRow name='Name' value={item.name}/>
						<StarShipInfoRow name='Model' value={`${item.model}`}/>
						<StarShipInfoRow name='Manufacturer' value={item.manufacturer}/>
						<StarShipInfoRow name='Length' value={item.length}/>
						<StarShipInfoRow name='Passengers' value={item.passengers}/>
						<StarShipInfoRow name='Max atmosphering speed' value={item.max_atmosphering_speed}/>
						<StarShipInfoRow name='Starship class' value={item.starship_class}/>
					</dl>
				</StarShipInfoWrapper>
			</div>
		</div>
	);
}

// export const PlanetInfoWithPlanet = withPlanet(PlanetTile);