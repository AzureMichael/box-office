import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../api/tv-maze-api";
import { useShow } from "../../hooks/custom-hooks";
import { InfoBlock } from "../../styled-components/Show.styled";
import Cast from "../show/Cast";
import Details from "../show/Details";
import Seasons from "../show/Seasons";
import ShowMainData from "../show/ShowMainData";

const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Loading data</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {show && (
        <div>
          <ShowMainData
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genres}
          />
          <InfoBlock>
            <h2>Details</h2>
            <Details
              status={show.status}
              network={show.network}
              premiered={show.premiered}
            />
          </InfoBlock>

          <InfoBlock>
            <h2>Seasons</h2>
            {show._embedded.seasons && (
              <Seasons seasons={show._embedded.seasons} />
            )}
          </InfoBlock>
          <InfoBlock>
            <h2>Cast</h2>
            {show._embedded.cast && <Cast cast={show._embedded.cast} />}
          </InfoBlock>
        </div>
      )}
    </div>
  );
};

export default Show;
