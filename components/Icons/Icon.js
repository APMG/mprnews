import React from 'react';
import PropTypes from 'prop-types';
import IconCar from './IconCar';
import IconChevronDown from './IconChevronDown';
import IconChevronLeft from './IconChevronLeft';
import IconChevronRight from './IconChevronRight';
import IconChevronUp from './IconChevronUp';
import IconEmpty from './IconEmpty';
import IconFacebook from './IconFacebook';
import IconLocation from './IconLocation';
import IconMail from './IconMail';
import IconPause from './IconPause';
import IconPlay from './IconPlay';
import IconSearch from './IconSearch';
import IconTwitter from './IconTwitter';
import IconUpdraft from './IconUpdraft';
import IconVolumeDown from './IconVolumeDown';
import IconVolumeMute from './IconVolumeMute';
import IconVolumeOff from './IconVolumeOff';
import IconVolumeUp from './IconVolumeUp';
import IconHeadphones from './IconHeadphones';
import IconPopOut from './IconPopOut';

const icons = {
  empty: IconEmpty,
  car: IconCar,
  chevronDown: IconChevronDown,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  chevronUp: IconChevronUp,
  facebook: IconFacebook,
  location: IconLocation,
  mail: IconMail,
  pause: IconPause,
  play: IconPlay,
  search: IconSearch,
  twitter: IconTwitter,
  updraft: IconUpdraft,
  volumeDown: IconVolumeDown,
  volumeMute: IconVolumeMute,
  volumeOff: IconVolumeOff,
  volumeUp: IconVolumeUp,
  headphones: IconHeadphones,
  popout: IconPopOut
};

const Icon = (props) => {
  const { name, ...rest } = props;

  // Check if the icon is in the list; if not, render the empty icon
  const Element = icons[name] ? icons[name] : icons.empty;

  return <Element {...rest} />;
};

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;
