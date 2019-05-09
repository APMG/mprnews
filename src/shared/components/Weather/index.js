import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStation: null,
      error: null,
      isLoaded: false,
      currentLocation: '',
      defaultCity: {
        forecastOffice: 'MPX',
        station: 'KMSP',
        gridpoints: { lat: '109', long: '67' }
      },

      response: []
      // locations: [
      //   {
      //     id: 'MSP',
      //     name: 'MSP Airport',
      //     lat: '44.8848',
      //     long: '-93.2223',
      //     forecastOffice: 'MPX'
      //   },
      //   {
      //     id: 'SP',
      //     name: 'St.Paul, MN',
      //     lat: '44.9537',
      //     long: '-93.0900',
      //     forecastOffice: 'MPX'
      //   },
      //   {
      //     id: 'BEM',
      //     name: 'Bemidji, MN',
      //     lat: '47.4716',
      //     long: '-94.8827',
      //     forecastOffice: 'FGF'
      //   },
      //   {
      //     id: 'BRA',
      //     name: 'Brainerd, MN',
      //     lat: '46.3527',
      //     long: '-94.2020',
      //     forecastOffice: 'DLH'
      //   },
      //   {
      //     id: 'DUL',
      //     name: 'Duluth, MN',
      //     lat: '46.7867',
      //     long: '-92.1005',
      //     forecastOffice: 'DLH'
      //   },
      //   {
      //     id: 'ELY',
      //     name: 'Ely, MN',
      //     lat: '47.9032',
      //     long: '-91.8671',
      //     forecastOffice: 'DLH'
      //   },
      //   {
      //     id: 'EAU',
      //     name: 'Eau Claire, WI',
      //     lat: '44.8113',
      //     long: '-91.4985',
      //     forecastOffice: 'MPX'
      //   },
      //   {
      //     id: 'FAR',
      //     name: 'Fargo, ND',
      //     lat: '46.8772',
      //     long: '-96.7898',
      //     forecastOffice: 'FGF'
      //   },
      //   {
      //     id: 'GRA',
      //     name: 'Grand Forks, ND',
      //     lat: '47.9253',
      //     long: '-97.0329',
      //     forecastOffice: 'FGF'
      //   }
      // ]
    };
    // msp airport: https://api.weather.gov/gridpoints/mpx/109,67/stations
    // st.paul: https://api.weather.gov/gridpoints/MPX/113,70/stations
    // bemidji: https://api.weather.gov/gridpoints/FGF/161,83/stations
    // fargo: https://api.weather.gov/gridpoints/FGF/99,56/stations
    // brainerd: https://api.weather.gov/gridpoints/DLH/21,45/stations
    // duluth: https://api.weather.gov/gridpoints/DLH/89,66/stations
    // ely: https://api.weather.gov/gridpoints/DLH/95,119/stations
    // eau claire: https://api.weather.gov/gridpoints/MPX/166,64/stations
    // grand forks: https://api.weather.gov/gridpoints/FGF/92,106/stations

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    // API
    // input: https://api.weather.gov/points/44.88,-93.22/forecast
    // returns: https://api.weather.gov/gridpoints/MPX/109,67/forecast
    // const url = `https://api.weather.gov/points/${this.windowLocationHref()}/forecast`;
    const officeSlug = this.state.defaultCity.forecastOffice;
    let gridSlug = this.state.defaultCity.gridpoints;

    const url = `https://api.weather.gov/gridpoints/${officeSlug}/${
      gridSlug.lat
    },${gridSlug.long}/stations`;

    axios
      .get(url)
      .then((res) => {
        this.setState({ isLoaded: true, response: res.data });

        // this.getNameFromApi();
        console.log(`Log 🎾:`, this.state);
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  getNameFromApi() {
    // const url = this.state.response.properties.observationStations;

    // const stationsSlug = this.state.selectedStation;

    const url = `https://api.weather.gov/stations/${this.windowLocationHref()}`;
    axios
      .get(url)
      .then((res) => {
        this.setState({ isLoaded: true, currentLocation: res.data });
        console.log('axios:', this.state);
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  windowLocationHref() {
    if (this.props['*'] && this.state.selectedStation == null) {
      this.setState({
        selectedStation: `${this.props['*']}`
      });
      return `${this.props['*']}`;
    } else if (this.state.selectedStation !== null) {
      return this.state.selectedStation;
    }
  }

  handleOnChange(event) {
    navigate(`${event.target.value}`);
    this.setState({
      selectedStation: `${event.target.value}`
    });

    console.log(this.state);
    return this.getNameFromApi();
  }

  render() {
    const { error, isLoaded, response } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <select onChange={this.handleOnChange}>
            {response.features.map((city) => {
              return (
                <option
                  key={city.properties.stationIdentifier}
                  value={city.properties.stationIdentifier}
                >
                  {city.properties.name}
                </option>
              );
            })}
          </select>

          {/* {console.log(
            this.state.currentLocation ? (
              this.state.currentLocation.id
            ) : (
              <>nothing yet</>
            )
          )} */}
          {/* 
          {this.state.currentLocation &&
            this.state.currentLocation.map((location) => {
              return (
                <>
                  {console.log(location.type)}
                  <h1>{location.properties.name}</h1>
                </>
              );
            })} */}

          {/* <h1>{this.props.path} page</h1>
          Generated at:
          {response.properties.generatedAt}
          <br />
          Updated at:
          {response.properties.updateTime}
          <div>
            <h2>Current Conditions</h2>

            <select onChange={this.handleOnChange}>
              <option defaultValue="selected">More locations</option>
              {this.state.locations.map((event) => (
                <option
                  key={event.id}
                  name={event.name}
                  value={`${event.lat},${event.long}`}
                >
                  {event.name}
                </option>
              ))}
            </select>

            <div>
              {response.properties.periods[0].number === 1 &&
                response.properties.periods.splice(0, 1).map((data) => (
                  <div key={data.number}>
                    <div>{data.temperature}°</div>
                    {data.number}
                    <p>
                      {data.name} : {data.shortForecast}
                    </p>
                    <p>WindSpeed : {data.windSpeed}</p>
                    <p>WindDirection :{data.windDirection}</p>
                    Start: {data.startTime} End:
                    {data.endTime}
                    <p>{data.detailedForecast}</p>
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <h2>Conditions Periods</h2>
          <ul>
            {response.properties.periods.map((data) => (
              <div key={data.number}>
                <li>
                  <img src={data.icon} alt={data.name} />
                </li>
                <li>{data.number}</li>
                <li>
                  {data.name} : {data.shortForecast}
                </li>
                <li>
                  Temperature : {data.temperature}
                  {data.temperatureUnit}
                </li>
                <li>WindSpeed : {data.windSpeed}</li>
                <li>WindDirection: {data.windDirection}</li>
                <li>Start: {data.startTime}</li>
                <li>End: {data.endTime}</li>
                <li />
              </div>
            ))}
          </ul> */}
        </div>
      );
    }
  }
}

Weather.propTypes = {
  '*': PropTypes.string
};
