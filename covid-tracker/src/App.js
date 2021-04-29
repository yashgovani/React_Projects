import classes from './App.module.css';
import React from 'react';
import coronaImage from './images/covid.png';
import CountryPicker from './components/CountryPicker/CountryPicker';
//import axios from './axios-covid';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import { fetchData } from './components/api/index';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    /*  axios.get().then((res) => {
      this.setState({
        data: {
          confirmed: res.data.confirmed,
          recovered: res.data.recovered,
          deaths: res.data.deaths,
          lastUpdate: res.data.lastUpdate,
        },
      });
    }); */
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  /*  handleCountryChange = (country) => {
    axios
      .get(`/countries/${country}`)
      .then((res) => {
        this.setState({
          data: {
            confirmed: res.data.confirmed,
            recovered: res.data.recovered,
            deaths: res.data.deaths,
            lastUpdate: res.data.lastUpdate,
          },
          country: country,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }; */

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={classes.container}>
        <img className={classes.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} country={country} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
