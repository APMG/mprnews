import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import WeatherContext from '../endpoints/Weather/WeatherContext';
import axios from 'axios';
import Router from 'next/router';

class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = {
      selectLocation: null,
      weather: { response: {}, isLoaded: false, error: null },
      handleOnChange: this.handleOnChange.bind(this)
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const pathname = window.location.pathname.split('/');
    const geoLocation = pathname[pathname.length - 1];
    const coordinates = geoLocation.match(/-?\d+(\.\d+)?,\s*(-?\d+(\.\d+)?)/g)
      ? geoLocation
      : `44.9434,-93.0965`;

    let url = `https://api.weather.gov/points/${coordinates}/forecast`;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          weather: { response: res.data, isLoaded: true }
        });
      })
      .catch((error) => {
        this.setState({ weather: { isLoaded: true, error: error } });
      });
  }

  handleOnChange(event) {
    this.setState({
      selectLocation: `${event.target.value}`
    });
    Router.push(`/weather/${event.target.value}`);

    return this.fetchWeatherData();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <WeatherContext.Provider value={this.state}>
            <Component {...pageProps} />
          </WeatherContext.Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
