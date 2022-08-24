import React, { useEffect } from "react";
import { useState } from "react";
import { apiGet } from "../../api/tv-maze-api";
import ActorGrid from "../layouts/actor/ActorGrid";
import ShowGrid from "../layouts/show/ShowGrid";
import MainPageLayout from "../layouts/MainPageLayout";
import { useLastQuery } from "../../hooks/custom-hooks";
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from "../../styled-components/Home.styled";
import CustomRadio from "../CustomRadio";

const Home = () => {
  const [input, setInput] = useLastQuery("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then((results) =>
      setResults(results)
    );
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(input);
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
  };

  const onRadioChange = (event) => {
    setSearchOption(event.target.value);
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder="Search for something"
      />

      <RadioInputsWrapper>
        <div>
            <CustomRadio
              label="Shows"
              id="shows-search"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
        </div>
        <div>
          <CustomRadio
              label="Actors"
              id="actor-search"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
