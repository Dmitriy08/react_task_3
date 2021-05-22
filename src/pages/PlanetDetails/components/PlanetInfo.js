import { useCallback } from "react";
import styled from "styled-components";
import { getDefaultImage, getPlanetImageUrl } from "../../../utils";
import PlanetInfoRow from "../../Planets/components/PlanetInfoRow";

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

export default function PlanetInfo({ id, planet }) {
  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
    }
  }, []);

  return (
    <InfoWRapper>
      <div>
        <img
          src={getPlanetImageUrl(id)}
          alt={planet.name}
          className="img-thumbnail"
          onError={onImageLoadError}
        />
      </div>
      <div>
        <dl>
          <PlanetInfoRow name="Diameter:" value={`${planet.diameter} km`} />
        </dl>
        <dl>
          <PlanetInfoRow name="Population:" value={`${planet.population}`} />
        </dl>
        <dl>
          <PlanetInfoRow name="Terrain:" value={`${planet.terrain}`} />
        </dl>
      </div>
      <div>
        <dl>
          <PlanetInfoRow
            name="Orbital period:"
            value={`${planet.orbital_period}`}
          />
        </dl>
        <dl>
          <PlanetInfoRow
            name="Rotation period:"
            value={`${planet.rotation_period}`}
          />
        </dl>
        <dl>
          <PlanetInfoRow
            name="Appeared in:"
            value={`${planet.films.length} films`}
          />
        </dl>
      </div>
    </InfoWRapper>
  );
}
