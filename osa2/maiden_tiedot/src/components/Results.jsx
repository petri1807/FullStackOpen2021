import React from 'react';
import { SingleResult, MultipleResults } from './Result';

// Renders the collection of results
export const Results = ({ countries, showHandler, visible }) => {
  const filterWithButtonPress = countries.filter(
    (country) => country.name === visible.name
  );

  if (!countries.length) return <p>No results</p>;

  if (countries.length === 1) {
    return <SingleResult country={countries} />;
  }

  if (countries.length > 1 && countries.length <= 10) {
    if (visible.visible) {
      return <SingleResult country={filterWithButtonPress} />;
    }
    return <MultipleResults countries={countries} handler={showHandler} />;
  }

  if (countries.length > 10) return <p>Too many results, narrow more</p>;

  return <div>Something went wrong</div>;
};
