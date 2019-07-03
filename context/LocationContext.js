import React from 'react';
import { weatherConfig } from '../utils/defaultData';

const LocationContext = React.createContext({
  location: weatherConfig[0],
  handleLocationChange() {}
});

export default LocationContext;
