import React, { useCallback } from "react";
import styled from "styled-components";
import { getDefaultImage, getPeopleImageUrl } from "../../../utils";
import CharacterInfoRow from "../../Characters/components/CharacterInfoRow";

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

export default function CharacterInfo({ id, character }) {
  const onImageLoadError = useCallback((e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
    }
  }, []);

  return (
    <InfoWRapper>
      <div>
        <img
          src={getPeopleImageUrl(id)}
          alt={character.name}
          className="img-thumbnail"
          onError={onImageLoadError}
        />
      </div>
      <div>
        <dl>
            <CharacterInfoRow name='Height' value={character.height} />
        </dl>
        <dl>
            <CharacterInfoRow name='Mass' value={`${character.mass} kg`} />
        </dl>
        <dl>
            <CharacterInfoRow name='Hair color' value={character.hair_color} />
        </dl>
          <dl>
              <CharacterInfoRow name='Skin color' value={character.skin_color} />
          </dl>

      </div>
        <div>
            <dl>
                <CharacterInfoRow name='Eye color' value={character.eye_color} />
            </dl>
            <dl>
                <CharacterInfoRow name='Birth year' value={character.birth_year} />
            </dl>
            <dl>
                <CharacterInfoRow name='Gender' value={character.gender} />
            </dl>
        </div>
    </InfoWRapper>
  );
}
