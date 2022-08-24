import React, { useCallback } from "react";
import ShowCard from "./ShowCard";
import { FlexGrid } from "../../../styled-components/styled-components";

import IMAGE_NOT_FOUND from "../../../images/not-found.png";
import { useShows } from "../../../hooks/custom-hooks";

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const onStarClick = useCallback( () => {
          if (isStarred) {
            dispatchStarred({ type: "REMOVE", showId: show.id });
          } else {
            dispatchStarred({ type: "ADD", showId: show.id });
          }
        }, [isStarred, show.id]);

        return (
          <ShowCard
            id={show.id}
            key={show.id}
            name={show.name}
            summary={show.summary}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
