import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import MainLayout from '../layouts/MainLayout';
import Weather from '../endpoints/Weather';
import WeatherContext from '../endpoints/Weather/WeatherContext';
import { weatherConfig } from '../utils/defaultData';

class WeatherPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: {
        isLoaded: false,
        error: null,
        selectedCoordinates: null,
        selectedLocationName: null,
        coordinates: null
      },
      handleOnChange: this.handleOnChange.bind(this),
      getSlugProps: this.getSlugProps.bind(this)
    };
  }

  getSlugProps(slug) {
    const coordinates = weatherConfig.find(
      (weather) => weather.id.indexOf(slug) > -1
    );
    console.log(coordinates);
    if (coordinates === this.state.weather.selectedCoordinates) return;
    this.setState(
      {
        ...this.state.weather,
        weather: {
          selectedCoordinates: `${coordinates.lat},${coordinates.long}`,
          selectedLocationName: coordinates.name
        }
      },
      this.fetchWeatherData(`${coordinates.lat},${coordinates.long}`)
    );
  }

  fetchWeatherData(coordinates) {
    let url = `https://api.weather.gov/points/${coordinates}/forecast`;
    axios
      .get(url)
      .then((res) => {
        return this.setState({
          weather: {
            isLoaded: true,
            selectedLocationName: this.state.weather.selectedLocationName,
            selectedCoordinates: this.state.weather.selectedCoordinates,
            response: res.data
          }
        });
      })
      .catch((error) => {
        this.setState({ weather: { isLoaded: true, error: error } });
      });
  }

  handleOnChange(event) {
    this.setState(
      {
        weather: {
          ...this.state.weather,
          selectedCoordinates: event.target.value,
          selectedLocationName: event.target[event.target.selectedIndex].label
        }
      },
      this.fetchWeatherData(event.target.value)
    );
    Router.push(`/weather/${event.target[event.target.selectedIndex].id}`);
  }

  render() {
    return (
      <div>
        <WeatherContext.Provider value={this.state}>
          <MainLayout>
            <Weather />
          </MainLayout>
        </WeatherContext.Provider>
      </div>
    );
  }
}

// const WeatherPage = () => {
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState({
//     response: {},
//     isLoaded: false,
//     error: null
//   });

//   const fetchWeatherData = () => {
//     const pathname = window.location.pathname.split('/');
//     const geoLocation = pathname[pathname.length - 1];
//     const coordinates = geoLocation.match(/-?\d+(\.\d+)?,\s*(-?\d+(\.\d+)?)/g)
//       ? geoLocation
//       : `44.9434,-93.0965`;

//     let url = `https://api.weather.gov/points/${coordinates}/forecast`;
//     axios
//       .get(url)
//       .then((res) => {
//         setWeather({ response: res.data, isLoaded: true });
//       })
//       .catch((error) => {
//         setWeather({ isLoaded: true, error: error });
//       });
//   };

//   const handleOnChange = (event) => {
//     setLocation(`${event.target.value}`);

//     Router.push(`/weather/${event.target.value}`);

//     return fetchWeatherData();
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   });

//   return (
//     <MainLayout>
//       <WeatherContext.Provider
//         value={{
//           location: location,
//           weather: weather,
//           handleOnChange: handleOnChange
//         }}
//       >
//         <Weather />
//       </WeatherContext.Provider>
//     </MainLayout>
//   );
// };

export default WeatherPage;
