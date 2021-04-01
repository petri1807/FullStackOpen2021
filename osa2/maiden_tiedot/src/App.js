import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Results } from './components/Results';

const App = () => {
  const [data, setData] = useState([]);
  const [filterWord, setFilterWord] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [visible, setVisible] = useState({ visible: false, name: '' });

  const filterHandler = (event) => {
    setFilterWord(event.target.value);
    setVisible({ visible: false, name: '' });
  };

  const showHandler = (countryName) => {
    let status = {};
    if (visible.visible) status = { visible: false, name: '' };
    if (!visible.visible) status = { visible: true, name: countryName };
    setVisible(status);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    const filterCountries = data.filter((country) =>
      country.name.toLowerCase().includes(filterWord.toLowerCase())
        ? true
        : false
    );

    setSearchResult(filterCountries);
  }, [filterWord, data]);

  return (
    <div>
      <div>
        find countries: <input onChange={filterHandler} />
      </div>
      <Results
        countries={searchResult}
        showHandler={showHandler}
        visible={visible}
      />
    </div>
  );
};

export default App;
