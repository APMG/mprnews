import React from 'react';
import PropTypes from 'prop-types';

let weatherMoods = {
  day: '#fba301',
  night: '#002576',
  snow: '#72d9ff'
};

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
  {
    code: 'skc',
    time: 'day',
    icon: WeatherIconDayClear,
    color: weatherMoods.day
  },
  {
    code: 'skc',
    time: 'night',
    icon: WeatherIconNightClear,
    color: weatherMoods.night
  },
  {
    code: 'few',
    time: 'day',
    icon: WeatherIconDayClear,
    color: weatherMoods.day
  },
  {
    code: 'few',
    time: 'night',
    icon: WeatherIconNightClear,
    color: weatherMoods.night
  },
  {
    code: 'sct',
    time: 'day',
    icon: WeatherIconDayCloudy,
    color: weatherMoods.day
  },
  {
    code: 'sct',
    time: 'night',
    icon: WeatherIconNightCloudy,
    color: weatherMoods.night
  },
  {
    code: 'bkn',
    time: 'day',
    icon: WeatherIconDayCloudy,
    color: weatherMoods.day
  },
  {
    code: 'bkn',
    time: 'night',
    icon: WeatherIconNightCloudy,
    color: weatherMoods.night
  },
  {
    code: 'ovc',
    time: 'day',
    icon: WeatherIconDayOvercast,
    color: weatherMoods.day
  },
  {
    code: 'ovc',
    time: 'night',
    icon: WeatherIconNightOvercast,
    color: weatherMoods.night
  },
  {
    code: 'wind_skc',
    time: 'day',
    icon: WeatherIconDayWindy,
    color: weatherMoods.day
  },
  {
    code: 'wind_skc',
    time: 'night',
    icon: WeatherIconNightWindy,
    color: weatherMoods.night
  },
  {
    code: 'wind_few',
    time: 'day',
    icon: WeatherIconDayWindy,
    color: weatherMoods.day
  },
  {
    code: 'wind_few',
    time: 'night',
    icon: WeatherIconNightWindy,
    color: weatherMoods.night
  },
  {
    code: 'wind_sct',
    time: 'day',
    icon: WeatherIconDayCloudyWindy,
    color: weatherMoods.day
  },
  {
    code: 'wind_sct',
    time: 'night',
    icon: WeatherIconNightCloudyWindy,
    color: weatherMoods.night
  },
  {
    code: 'wind_bkn',
    time: 'day',
    icon: WeatherIconDayCloudyWindy,
    color: weatherMoods.day
  },
  {
    code: 'wind_bkn',
    time: 'night',
    icon: WeatherIconNightCloudyWindy,
    color: weatherMoods.night
  },
  {
    code: 'wind_ovc',
    time: 'day',
    icon: WeatherIconDayCloudyWindy,
    color: weatherMoods.day
  },
  {
    code: 'wind_ovc',
    time: 'night',
    icon: WeatherIconNightCloudyWindy,
    color: weatherMoods.night
  },
  {
    code: 'snow',
    time: 'day',
    icon: WeatherIconDaySnow,
    color: weatherMoods.day
  },
  {
    code: 'snow',
    time: 'night',
    icon: WeatherIconNightSnow,
    color: weatherMoods.night
  },
  {
    code: 'rain_snow',
    time: 'day',
    icon: WeatherIconDayRainMix,
    color: weatherMoods.day
  },
  {
    code: 'rain_snow',
    time: 'night',
    icon: WeatherIconNightRainMix,
    color: weatherMoods.night
  },
  {
    code: 'rain_sleet',
    time: 'day',
    icon: WeatherIconDaySleet,
    color: weatherMoods.day
  },
  {
    code: 'rain_sleet',
    time: 'night',
    icon: WeatherIconNightSleet,
    color: weatherMoods.night
  },
  {
    code: 'snow_sleet',
    time: 'day',
    icon: WeatherIconDaySleet,
    color: weatherMoods.day
  },
  {
    code: 'snow_sleet',
    time: 'night',
    icon: WeatherIconNightSleet,
    color: weatherMoods.night
  },
  {
    code: 'fzra',
    time: 'day',
    icon: WeatherIconDayRainMix,
    color: weatherMoods.day
  },
  {
    code: 'fzra',
    time: 'night',
    icon: WeatherIconNightRainMix,
    color: weatherMoods.night
  },
  {
    code: 'rain_fzra',
    time: 'day',
    icon: WeatherIconDayRainMix,
    color: weatherMoods.day
  },
  {
    code: 'rain_fzra',
    time: 'night',
    icon: WeatherIconNightRainMix,
    color: weatherMoods.night
  },
  {
    code: 'sleet',
    time: 'day',
    icon: WeatherIconDaySleet,
    color: weatherMoods.day
  },
  {
    code: 'sleet',
    time: 'night',
    icon: WeatherIconNightSleet,
    color: weatherMoods.night
  },
  {
    code: 'rain',
    time: 'day',
    icon: WeatherIconDayRain,
    color: weatherMoods.day
  },
  {
    code: 'rain',
    time: 'night',
    icon: WeatherIconNightRain,
    color: weatherMoods.night
  },
  {
    code: 'rain_showers',
    time: 'day',
    icon: WeatherIconDayShowers,
    color: weatherMoods.day
  },
  {
    code: 'rain_showers',
    time: 'night',
    icon: WeatherIconNightShowers,
    color: weatherMoods.night
  },
  {
    code: 'rain_showers_hi',
    time: 'day',
    icon: WeatherIconDayShowers,
    color: weatherMoods.day
  },
  {
    code: 'rain_showers_hi',
    time: 'night',
    icon: WeatherIconNightShowers,
    color: weatherMoods.night
  },
  {
    code: 'tsra',
    time: 'day',
    icon: WeatherIconDayThunderstorm,
    color: weatherMoods.day
  },
  {
    code: 'tsra',
    time: 'night',
    icon: WeatherIconNightThunderstorm,
    color: weatherMoods.night
  },
  {
    code: 'tsra_sct',
    time: 'day',
    icon: WeatherIconDayThunderstorm,
    color: weatherMoods.day
  },
  {
    code: 'tsra_sct',
    time: 'night',
    icon: WeatherIconNightThunderstorm,
    color: weatherMoods.night
  },
  {
    code: 'tsra_hi',
    time: 'day',
    icon: WeatherIconDayThunderstorm,
    color: weatherMoods.day
  },
  {
    code: 'tsra_hi',
    time: 'night',
    icon: WeatherIconNightThunderstorm,
    color: weatherMoods.night
  },
  {
    code: 'tornado',
    time: 'both',
    icon: WeatherIconTornado,
    color: weatherMoods.day
  },
  {
    code: 'hurricane',
    time: 'both',
    icon: WeatherIconHurricane,
    color: weatherMoods.day
  },
  {
    code: 'tropical_storm',
    time: 'both',
    icon: WeatherIconHurricane,
    color: weatherMoods.day
  },
  {
    code: 'dust',
    time: 'both',
    icon: WeatherIconSandstorm,
    color: weatherMoods.day
  },
  {
    code: 'smoke',
    time: 'both',
    icon: WeatherIconSmoke,
    color: weatherMoods.day
  },
  {
    code: 'haze',
    time: 'both',
    icon: WeatherIconHaze,
    color: weatherMoods.day
  },
  { code: 'hot', time: 'both', icon: WeatherIconHot, color: weatherMoods.day },
  {
    code: 'cold',
    time: 'both',
    icon: WeatherIconSnowflake,
    color: weatherMoods.snow
  },
  {
    code: 'blizzard',
    time: 'day',
    icon: WeatherIconDaySnowstorm,
    color: weatherMoods.snow
  },
  {
    code: 'blizzard',
    time: 'night',
    icon: WeatherIconNightSnowstorm,
    color: weatherMoods.snow
  },
  {
    code: 'fog',
    time: 'day',
    icon: WeatherIconDayFog,
    color: weatherMoods.day
  },
  {
    code: 'fog',
    time: 'night',
    icon: WeatherIconNightFog,
    color: weatherMoods.day
  }
];

const WeatherIcon = ({ iconUrl, ...rest }) => {
  let timeRegex = /(\w*day|night\w*)/g;
  let time = iconUrl.match(timeRegex)[0];

  let codeRegex = /(\w*(skc|few|sct|bkn|ovc|snow|rain|sleet|fzra|showers|tsra|hi|tornado|hurricane|tropical|storm|dust|smoke|haze|hot|cold|blizzard|fog)\w*)/g;
  // They will often stick other codes in the URL too and give a sort of split icon for a 20% chance of thunderstorms, but it looks bad and isn't clear so I'm simply going with their first prediction: the one they've called most likely for this hour. The other information (like chance of rain or storm) can be read more clearly in the text accompanying this icon.
  let code = iconUrl.match(codeRegex)[0];

  const icon = icons.find((icon) => icon.code === code && icon.time === time);

  if (icon === undefined) {
    return <WeatherIconEmpty />;
  } else {
    const Element = icon.icon;
    return <Element fill={icon.color} {...rest} />;
  }
};

WeatherIcon.propTypes = {
  iconUrl: PropTypes.string
};

export default WeatherIcon;
