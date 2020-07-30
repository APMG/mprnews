import App from 'next/app';
import React from 'react';
import initApollo from '../lib/init-apollo';
import { ApolloProvider } from 'react-apollo';
import NowPlayingClient from 'nowplaying-client';
import { weatherConfig } from '../utils/defaultData';
import { CtoF } from '../utils/utils';
import AudioPlayerContext from '../context/AudioPlayerContext';
import WeatherContext from '../context/WeatherContext';
import Layout from '../layouts/Layout';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import TagManager from 'react-gtm-module';
import '../styles/index.scss';

const tagManagerArgs = {
  gtmId: 'GTM-KTT2Z2'
};

class MPRNews extends App {
  constructor(props) {
    super(props);
    this.audioElementRef = React.createRef();
    this.playerRef = React.createRef();
    this.defaultAudioSource = JSON.stringify([
      {
        url: 'https://nis.stream.publicradio.org/nis.aac',
        type: 'audio/aac'
      },
      {
        url: 'https://nis.stream.publicradio.org/nis.mp3',
        type: 'audio/mpeg'
      }
    ]);
    this.defaultAudioTitle = 'MPR News';

    this.state = {
      audioElementRef: this.audioElementRef,
      audioSource: this.defaultAudioSource,
      audioTitle: this.defaultAudioTitle,
      audioThumbnail: null,
      audioSubtitle: '',
      isAudioLive: true,
      isAudioPlaying: false,
      isPlayerVisible: false,
      handleAudioButtonClick: this.handleAudioButtonClick,
      loadPlayer: this.loadPlayer,
      nowPlayingTitle: this.defaultAudioTitle,
      nowPlayingThumbnail: null,
      playerInstance: null,
      playerRef: this.playerRef,
      playlist: {},
      resetLivePlayer: this.resetLivePlayer,
      location: weatherConfig[0],
      handleLocationChange: this.handleLocationChange,
      weatherData: {}
    };
  }

  componentDidMount() {
    this.setupNowPlaying();
    this.state.audioElementRef.current?.addEventListener('pause', () => {
      if (this.state.isAudioPlaying === true) {
        this.setState({ isAudioPlaying: false });
      }
    });

    this.state.audioElementRef.current?.addEventListener('play', () => {
      // This assumes we only have one possible live audio stream. Something else will need to be done to handle more
      this.setState({
        isAudioLive: this.state.audioSource === this.defaultAudioSource
      });

      if (this.state.isAudioPlaying === false) {
        this.setState({ isAudioPlaying: true });
      }
    });

    this.state.audioElementRef.current?.addEventListener('ended', () => {
      // Use the live player when audio playback completes
      this.setState({ isAudioLive: true });
      this.state.resetLivePlayer();
    });
    TagManager.initialize(tagManagerArgs);

    this.getWeatherData(this.state.location);
  }

  loadPlayer = () => {
    let APMPlayer, Player, analytics;

    new Promise((resolve) => {
      APMPlayer = require('apm-html5-player');
      resolve();
    }).then(
      () => {
        Player = APMPlayer.Player;
        analytics = new APMPlayer.AudioAnalytics();
        this.state.playerInstance = new Player(
          this.state.playerRef.current
        ).init();
        analytics.init({ audio: this.state.audioElementRef.current });
      },
      (error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    );
  };

  handleAudioButtonClick = (audioSource, audioTitle, audioSubtitle) => {
    if (this.state.isAudioPlaying && this.state.audioSource === audioSource) {
      this.pauseAudio(audioSource, audioTitle, audioSubtitle);
    } else if (this.state.audioSource !== audioSource) {
      this.state.playerInstance.unloadAudio();
      this.playAudio(audioSource, audioTitle, audioSubtitle);
    } else {
      this.playAudio(audioSource, audioTitle, audioSubtitle);
    }
  };

  playAudio(audioSource, audioTitle, audioSubtitle) {
    if (this.state.playerInstance === null) return;
    const isAudioLive = audioSource == this.defaultAudioSource;
    this.setState(
      {
        isAudioPlaying: true,
        audioSource,
        audioTitle,
        audioSubtitle,
        isAudioLive
      },
      () => {
        this.state.playerInstance.handlePlay();
      }
    );
  }

  pauseAudio(audioSource, audioTitle, audioSubtitle) {
    if (this.state.playerInstance === null) return;

    this.setState(
      { isAudioPlaying: false, audioSource, audioTitle, audioSubtitle },
      () => {
        this.state.playerInstance.handlePlay();
      }
    );
  }

  resetLivePlayer = (autoPlay) => {
    if (this.state.playerInstance === null) return;

    this.playerRef.current.setAttribute('data-src', this.defaultAudioSource);
    this.setState(
      {
        audioTitle: this.state.nowPlayingTitle,
        audioSource: this.defaultAudioSource
      },
      () => {
        if (autoPlay) {
          this.state.playerInstance.unloadAudio();
          this.playAudio(this.state.audioSource, this.state.audioTitle);
        } else {
          this.state.playerInstance.unloadAudio();
        }
      }
    );
  };

  setNowPlayingTitle(schedule) {
    let title = schedule[0].shows[0].name;
    if (schedule[0].people[0]) {
      title += ` with ${schedule[0].people[0].name}`;
    }
    return title;
  }

  setNowPlayingThumbnail(songdata) {
    let thumbnail = songdata.art_url;
    if (songdata.art_url) {
      thumbnail += ` with ${songdata.art_url}`;
    }
    return thumbnail;
  }

  setupNowPlaying = () => {
    const self = this;
    const client = new NowPlayingClient({
      server: 'https://nowplaying.publicradio.org'
    });
    const registrations = [];
    const service = 'mpr-news';

    // Register the callback for a playlist change.
    const schedule_registration = client.register_callback(
      service,
      'schedule',
      function(data) {
        if (self.state.isAudioLive) {
          self.setState(
            {
              nowPlayingTitle: self.setNowPlayingTitle(data.schedule)
            },
            () => {
              self.setState({ audioTitle: self.state.nowPlayingTitle });
            }
          );
        }
      }
    );
    // Add the registration object to the array of registrations.
    registrations.push(schedule_registration);
  };

  handleLocationChange = (locationName) => {
    let newLocation = weatherConfig.find((item) => item.name === locationName);

    this.setState({
      location: newLocation,
      weatherData: this.getWeatherData(newLocation)
    });
  };

  getWeatherData = async ({ lat, long }) => {
    let dataObj = {
      high: undefined,
      low: undefined,
      shortForecast: undefined
    };

    try {
      let descResponse = await fetch(
        `https://api.weather.gov/points/${lat},${long}/forecast`
      );
      let statsUrl = descResponse.url.replace('/forecast', '');
      let statsResponse = await fetch(statsUrl);

      let descResult = await descResponse;
      let statsResult = await statsResponse;

      if (!statsResult.ok || !descResult.ok) return;

      descResult.json().then((data) => {
        if (data.properties?.periods) {
          dataObj.shortForecast = data.properties?.periods[0].shortForecast;
        }

        this.setState({
          weatherData: dataObj
        });
      });

      statsResult.json().then((data) => {
        if (data.properties?.maxTemperature?.values?.length > 0) {
          dataObj.high = CtoF(data.properties?.maxTemperature.values[0].value);
        }
        if (data.properties?.minTemperature?.values?.length > 0) {
          dataObj.low = CtoF(data.properties?.minTemperature.values[0].value);
        }

        this.setState({
          weatherData: dataObj
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    const { location, handleLocationChange, weatherData } = this.state;

    return (
      <AudioPlayerContext.Provider value={this.state}>
        <WeatherContext.Provider
          value={{ location, handleLocationChange, weatherData }}
        >
          <ApolloProvider client={initApollo()}>
            <Layout layout={pageProps?.layout}>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </WeatherContext.Provider>
      </AudioPlayerContext.Provider>
    );
  }
}

export default MPRNews;
