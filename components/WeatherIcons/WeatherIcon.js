import React from 'react';
import PropTypes from 'prop-types';
import WeatherIconDayClear from './WeatherIconDayClear';
import WeatherIconDayCloudy from './WeatherIconDayCloudy';
import WeatherIconDayCloudyWindy from './WeatherIconDayCloudyWindy';
import WeatherIconDayFog from './WeatherIconDayFog';
import WeatherIconDayOvercast from './WeatherIconDayOvercast';
import WeatherIconDayRain from './WeatherIconDayRain';
import WeatherIconDayRainMix from './WeatherIconDayRainMix';
import WeatherIconDayShowers from './WeatherIconDayShowers';
import WeatherIconDaySleet from './WeatherIconDaySleet';
import WeatherIconDaySnow from './WeatherIconDaySnow';
import WeatherIconDaySnowstorm from './WeatherIconDaySnowstorm';
import WeatherIconDayThunderstorm from './WeatherIconDayThunderstorm';
import WeatherIconDayWindy from './WeatherIconDayWindy';
import WeatherIconEmpty from './WeatherIconEmpty';
import WeatherIconHaze from './WeatherIconHaze';
import WeatherIconHot from './WeatherIconHot';
import WeatherIconHurricane from './WeatherIconHurricane';
import WeatherIconNightClear from './WeatherIconNightClear';
import WeatherIconNightCloudy from './WeatherIconNightCloudy';
import WeatherIconNightCloudyWindy from './WeatherIconNightCloudyWindy';
import WeatherIconNightFog from './WeatherIconNightFog';
import WeatherIconNightOvercast from './WeatherIconNightOvercast';
import WeatherIconNightRain from './WeatherIconNightRain';
import WeatherIconNightRainMix from './WeatherIconNightRainMix';
import WeatherIconNightShowers from './WeatherIconNightShowers';
import WeatherIconNightSleet from './WeatherIconNightSleet';
import WeatherIconNightSnow from './WeatherIconNightSnow';
import WeatherIconNightSnowstorm from './WeatherIconNightSnowstorm';
import WeatherIconNightThunderstorm from './WeatherIconNightThunderstorm';
import WeatherIconNightWindy from './WeatherIconNightWindy';
import WeatherIconSandstorm from './WeatherIconSandstorm';
import WeatherIconSmoke from './WeatherIconSmoke';
import WeatherIconTornado from './WeatherIconTornado';
import WeatherIconSnowflake from './WeatherIconSnowflake';

const icons = [
  { code: 'skc', time: 'day', icon: WeatherIconDayClear },
  { code: 'skc', time: 'night', icon: WeatherIconNightClear },
  { code: 'few', time: 'day', icon: WeatherIconDayClear },
  { code: 'few', time: 'night', icon: WeatherIconNightClear },
  { code: 'sct', time: 'day', icon: WeatherIconDayCloudy },
  { code: 'sct', time: 'night', icon: WeatherIconNightCloudy },
  { code: 'bkn', time: 'day', icon: WeatherIconDayCloudy },
  { code: 'bkn', time: 'night', icon: WeatherIconNightCloudy },
  { code: 'ovc', time: 'day', icon: WeatherIconDayOvercast },
  { code: 'ovc', time: 'night', icon: WeatherIconNightOvercast },
  { code: 'wind_skc', time: 'day', icon: WeatherIconDayWindy },
  { code: 'wind_skc', time: 'night', icon: WeatherIconNightWindy },
  { code: 'wind_few', time: 'day', icon: WeatherIconDayWindy },
  { code: 'wind_few', time: 'night', icon: WeatherIconNightWindy },
  { code: 'wind_sct', time: 'day', icon: WeatherIconDayCloudyWindy },
  { code: 'wind_sct', time: 'night', icon: WeatherIconNightCloudyWindy },
  { code: 'wind_bkn', time: 'day', icon: WeatherIconDayCloudyWindy },
  { code: 'wind_bkn', time: 'night', icon: WeatherIconNightCloudyWindy },
  { code: 'wind_ovc', time: 'day', icon: WeatherIconDayCloudyWindy },
  { code: 'wind_ovc', time: 'night', icon: WeatherIconNightCloudyWindy },
  { code: 'snow', time: 'day', icon: WeatherIconDaySnow },
  { code: 'snow', time: 'night', icon: WeatherIconNightSnow },
  { code: 'rain_snow', time: 'day', icon: WeatherIconDayRainMix },
  { code: 'rain_snow', time: 'night', icon: WeatherIconNightRainMix },
  { code: 'rain_sleet', time: 'day', icon: WeatherIconDaySleet },
  { code: 'rain_sleet', time: 'night', icon: WeatherIconNightSleet },
  { code: 'snow_sleet', time: 'day', icon: WeatherIconDaySleet },
  { code: 'snow_sleet', time: 'night', icon: WeatherIconNightSleet },
  { code: 'fzra', time: 'day', icon: WeatherIconDayRainMix },
  { code: 'fzra', time: 'night', icon: WeatherIconNightRainMix },
  { code: 'rain_fzra', time: 'day', icon: WeatherIconDayRainMix },
  { code: 'rain_fzra', time: 'night', icon: WeatherIconNightRainMix },
  { code: 'sleet', time: 'day', icon: WeatherIconDaySleet },
  { code: 'sleet', time: 'night', icon: WeatherIconNightSleet },
  { code: 'rain', time: 'day', icon: WeatherIconDayRain },
  { code: 'rain', time: 'night', icon: WeatherIconNightRain },
  { code: 'rain_showers', time: 'day', icon: WeatherIconDayShowers },
  { code: 'rain_showers', time: 'night', icon: WeatherIconNightShowers },
  { code: 'rain_showers_hi', time: 'day', icon: WeatherIconDayShowers },
  { code: 'rain_showers_hi', time: 'night', icon: WeatherIconNightShowers },
  { code: 'tsra', time: 'day', icon: WeatherIconDayThunderstorm },
  { code: 'tsra', time: 'night', icon: WeatherIconNightThunderstorm },
  { code: 'tsra_sct', time: 'day', icon: WeatherIconDayThunderstorm },
  { code: 'tsra_sct', time: 'night', icon: WeatherIconNightThunderstorm },
  { code: 'tsra_hi', time: 'day', icon: WeatherIconDayThunderstorm },
  { code: 'tsra_hi', time: 'night', icon: WeatherIconNightThunderstorm },
  { code: 'tornado', time: 'both', icon: WeatherIconTornado },
  { code: 'hurricane', time: 'both', icon: WeatherIconHurricane },
  { code: 'tropical_storm', time: 'both', icon: WeatherIconHurricane },
  { code: 'dust', time: 'both', icon: WeatherIconSandstorm },
  { code: 'smoke', time: 'both', icon: WeatherIconSmoke },
  { code: 'haze', time: 'both', icon: WeatherIconHaze },
  { code: 'hot', time: 'both', icon: WeatherIconHot },
  { code: 'cold', time: 'both', icon: WeatherIconSnowflake },
  { code: 'blizzard', time: 'day', icon: WeatherIconDaySnowstorm },
  { code: 'blizzard', time: 'night', icon: WeatherIconNightSnowstorm },
  { code: 'fog', time: 'day', icon: WeatherIconDayFog },
  { code: 'fog', time: 'night', icon: WeatherIconNightFog }
];

const WeatherIcon = ({ iconUrl, ...rest }) => {
  // Check if the icon exists; if not, render the empty icon
  // const Element = icons[iconUrl] ? icons[iconUrl] : icons.empty;
  let shortUrl = iconUrl.split('?')[0].split(',')[0];
  let urlArray = shortUrl.split('/');
  let time = urlArray[urlArray.length - 2];
  let code = urlArray[urlArray.length - 1];

  const icon = icons.find((icon) => icon.code === code && icon.time === time);

  const Element = icon === undefined ? icon.icon : WeatherIconEmpty;

  return <Element {...rest} />;
};

WeatherIcon.propTypes = {
  iconUrl: PropTypes.string
};

export default WeatherIcon;
