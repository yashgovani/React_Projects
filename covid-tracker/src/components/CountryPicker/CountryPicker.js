import classes from './CountryPicker.module.css';
import { FormControl, NativeSelect } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
//import axios from '../../axios-covid';
import {fetchCountries} from '../api/index'

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

/*   useEffect(() => {
    axios.get('/countries').then((res) => {
      setFetchedCountries(res.data.countries);
    });
  }, [setFetchedCountries]); */

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setFetchedCountries]);

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, key) => (
          <option key={key} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
