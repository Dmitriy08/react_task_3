import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/macro';

import {loadStarShips} from 'actions/starships';

import Loader from 'components/Loader';
import Pager from 'components/Pager';
import ServerError from 'components/ServerError';
import StarShipTile from './components/StarShipTile';
import {getDefaultImage, getStarShipId, getStarShipImageUrl} from '../../utils';

const defaultImageUrl = getDefaultImage();

const PlanetsWrapper = styled.div`
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

const StarShips = () => {
	const dispatch = useDispatch();
	const {starships, fetchingStarShips, starshipsError} = useSelector(
		state => state.starships
	);

	const [page, setPage] = useState(1);

	const onImageLoadError = useCallback(e => {
		if (e.target.src !== defaultImageUrl) {
			e.target.src = defaultImageUrl;
			e.target.classList.add('img-placeholder');
		}
	}, []);

	const {next, previous, results: list} = starships || {};

	const handleClickNext = e => {
		e.preventDefault();
		if (next) setPage(page + 1);
	};
	const handleClickPrev = e => {
		e.preventDefault();
		if (previous) setPage(page - 1);
	};

	useEffect(() => {
		dispatch(loadStarShips(page));
	}, [page, dispatch]);

	return (
		<div>
			<h1>Star Wars Ships</h1>
			{fetchingStarShips && <Loader/>}

			{starshipsError && <ServerError/>}
			{!starshipsError && !fetchingStarShips && list && (
				<>
					<PlanetsWrapper>
						{list.map(item => {
							const cloneItem = {...item};
							cloneItem.id = getStarShipId(item.url);
							cloneItem.imgSrc = getStarShipImageUrl(cloneItem.id);

							return (
								<StarShipTile
									key={cloneItem.name}
									item={cloneItem}
									onImageLoadError={onImageLoadError}
								/>
							);
						})}
					</PlanetsWrapper>

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

export default StarShips;
