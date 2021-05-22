import React, {useCallback} from "react";
import styled from "styled-components";
import {getDefaultImage, getStarShipImageUrl} from "../../../utils";
import StarShipInfoRow from "../../StarShips/components/StarShipInfoRow";

const defaultImageUrl = getDefaultImage();

const InfoWRapper = styled.div`
  display: flex;
  padding: 20px;
  font-size: 16px;
  background-color: #2e3338;
  border-radius: 10px;
  flex-direction: row;
  column-gap: 30px;
  height: 250px;

  img {
    max-height: 100%;
  }

  div:nth-child(n + 1) {
    display: flex;
    flex-direction: column;
    gap: 15px;

    dl {
      display: flex;
      flex-direction: row;
      gap: 15px;
      margin: 0;
    }
  }
`;

export default function StarShipInfo({id, starShip}) {
	const onImageLoadError = useCallback((e) => {
		if (e.target.src !== defaultImageUrl) {
			e.target.src = defaultImageUrl;
		}
	}, []);

	return (
		<InfoWRapper>
			<div>
				<img
					src={getStarShipImageUrl(id)}
					alt={starShip.name}
					className="img-thumbnail"
					onError={onImageLoadError}
				/>
			</div>
			<div>
				<dl>
					<StarShipInfoRow name='Name' value={starShip.name}/>
				</dl>
				<dl>
					<StarShipInfoRow name='Model' value={`${starShip.model}`}/>
				</dl>
				<dl>
					<StarShipInfoRow name='Manufacturer' value={starShip.manufacturer}/>
				</dl>
			</div>
			<div>
				<dl>
					<StarShipInfoRow name='Length' value={starShip.length}/>
				</dl>
				<dl>
					<StarShipInfoRow name='Passengers' value={starShip.passengers}/>
				</dl>
				<dl>
					<StarShipInfoRow name='Max atmosphering speed' value={starShip.max_atmosphering_speed}/>
				</dl>
			</div>
		</InfoWRapper>
	);
}
