import {useContext, useEffect, useReducer, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/Loader';
import ServerError from 'components/ServerError';

import apiService from 'services/planets';

import {NotificationContext} from '../../components/Notification';
import CharactersInfo, {
	InfoWrapper,
	CharacterWrapper as Cw,
} from './components/CharactersInfo';
import {getPeopleId, getPeopleImageUrl} from '../../utils';
import withStarShips from '../../hoc/withStarShips'
import {errorFetch, startFetch, successFetch} from './state/actions';
import reducer from './state/reducer';
import StarShipInfoRow from '../StarShips/components/StarShipInfoRow';
import StarShipInfo from "./components/StarShipInfo";

const PilotsWrapper = styled.div`
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
	starShipInfo: null,
};

const StarShipsDetails = ({getData}) => {
	const {id} = useParams();

	const notificationContext = useContext(NotificationContext);

	const [state, dispatch] = useReducer(reducer, initialState);

	const [pilotsInfo, setPilotsInfo] = useState([]);

	const {fetching, error, starShipInfo} = state;

	useEffect(() => {
		(async () => {
			dispatch(startFetch());

			try {
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
		if (!starShipInfo?.pilots) return;
		const peoplePromises = starShipInfo?.pilots.map(url => {
			const peopleId = url.replace(/^[\D]+|\/$/g, '');
			return apiService.getCharacter(peopleId).then(res => res.json());
		});


		(async () => {
			let peopleFullInfo = await Promise.allSettled(peoplePromises);
			peopleFullInfo = peopleFullInfo
				.map(({status, value}) => {
					return status === 'fulfilled' ? value : null;
				})
				.filter(info => info);
			setPilotsInfo(peopleFullInfo);
		})();
	}, [starShipInfo?.pilots]);

	/**
	 * End Show characters all together
	 */

	if (fetching) return <Loader/>;
	if (error) return <ServerError/>;
	if (!starShipInfo) return '';

	return (
		<div>
			<h1>
				{starShipInfo.name}
				<NextPlanetLinkWrapper>
					<Link to={`/starship/${+id + 1}`}>&rarr;</Link>
				</NextPlanetLinkWrapper>

				{/* // subscribe for context changes */}
				<small style={{fontSize: 12, paddingLeft: 20}}>
					<NotificationContext.Consumer>
						{value => (value.message ? `MESSAGE: ${value.message}` : '')}
					</NotificationContext.Consumer>
				</small>
			</h1>
			<StarShipInfo id={id} starShip={starShipInfo}/>

			{pilotsInfo.length > 0 && (
				<>
					<h2>Pilots</h2>
					<PilotsWrapper>
						{pilotsInfo.map(info => {
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
										<StarShipInfoRow name='Gender' value={info.gender}/>
									</InfoWrapper>
									<InfoWrapper>
										<StarShipInfoRow name='Birth day' value={info.birth_year}/>
									</InfoWrapper>
								</Cw>
							);
						})}
					</PilotsWrapper>
				</>
			)}
		</div>
	);
};

export default withStarShips(StarShipsDetails);
