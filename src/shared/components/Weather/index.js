import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// while searching for bemidji api using lat & long c47.47,-94.88/forecast will return with wfo and gridpoints https://api.weather.gov/gridpoints/FGF/161,83/forecast
export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCity: {},
      error: null,
      isLoaded: false,
      response: [],
      locations: [
        { id: 'MSP', name: 'MSP Airport', lat: '44.8848', long: '-93.2223' },
        { id: 'SP', name: 'St.Paul, MN', lat: '44.9537', long: '-93.0900' },
        { id: 'BEM', name: 'Bemidji, MN', lat: '47.4716', long: '-94.8827' },
        { id: 'BRA', name: 'Brainerd, MN', lat: '46.3527', long: '-94.2020' },
        { id: 'DUL', name: 'Duluth, MN', lat: '46.7867', long: '-92.1005' },
        { id: 'ELY', name: 'Ely, MN', lat: '47.9032', long: '-91.8671' },
        { id: 'EAU', name: 'Eau Claire, WI', lat: '44.8113', long: '-91.4985' },
        { id: 'FAR', name: 'Fargo, ND', lat: '46.8772', long: '-96.7898' },
        { id: 'GRA', name: 'Grand Forks, ND', lat: '47.9253', long: '-97.0329' }
      ]
    };

    this.mapMatch = this.mapMatch.bind(this);
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const url = `https://api.weather.gov/points/44.8848,-93.2223/forecast`;
    axios
      .get(url)
      .then((res) => {
        this.setState({ isLoaded: true, response: res.data });
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
        console.log(error);
      });
  }

  mapMatch(event) {
    let eventValue = event.target.value;
    this.state.locations.map((city) => {
      if (city.name === eventValue) {
        return this.setState({
          selectedCity: {
            city: eventValue,
            lat: city.lat,
            long: city.long
          }
        });
      }
    });
  }

  render() {
    const { error, isLoaded, response } = this.state;

    if (error) {
      return <div className="col">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="col">Loading...</div>;
    } else {
      return (
        <div>
          <h1>{this.props.path} page</h1>
          FORECAST:
          <br />
          <br />
          Generated at:{' '}
          {this.formatAMPM(new Date(response.properties.generatedAt))}
          <br />
          Updated at:{' '}
          {this.formatAMPM(new Date(response.properties.updateTime))}
          <div className="currentWeather">
            <br />
            <br />
            <h2>Current Conditions</h2>
            <select
              value={this.state.selectedCity.city}
              onChange={this.mapMatch}
            >
              {this.state.locations.map((area) => (
                <option key={area.id} id={area.id} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>
            {console.log(this.state)}

            <hr />

            <div>
              {response.properties.periods[0].number === 1 &&
                response.properties.periods.splice(0, 1).map((data) => (
                  <div key={2}>
                    <div className="temperature">{data.temperature}°</div>
                    <p>
                      {data.name} : {data.shortForecast}
                    </p>
                    <p>WindSpeed : {data.windSpeed}</p>
                    <p>WindDirection :{data.windDirection}</p>
                    Start: {this.formatAMPM(new Date(data.startTime))} End:{' '}
                    {this.formatAMPM(new Date(data.endTime))}
                    <p>{data.detailedForecast}</p>
                  </div>
                ))}
            </div>
            <br />
            <br />
            <br />
            <hr />
          </div>
          <ul>
            {console.log(response)}
            <div className="cards location">
              {response.properties.periods.map((data) => (
                <div className="card body" key={data.number}>
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
                  <li>
                    WindDirection:
                    {data.windDirection}
                  </li>
                  <li>Start: {this.formatAMPM(new Date(data.startTime))}</li>
                  <li>End: {this.formatAMPM(new Date(data.endTime))}</li>

                  <li />
                </div>
              ))}
            </div>
          </ul>
          <br />
          <hr />
        </div>
      );
    }
  }
}

Weather.propTypes = {
  path: PropTypes.string
};
