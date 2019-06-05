import React from 'react';
import { weatherConfig } from '../../config/index';
import PropTypes from 'prop-types';

const DropDownList = (props) => {
  const { select } = props;
  return (
    <div className="section">
      <select onChange={select.handleOnChange}>
        <option defaultValue="selected">More locations</option>
        {weatherConfig.map((location) => (
          <option
            id={location.id}
            label={location.name}
            key={location.id}
            value={`${location.lat},${location.long}`}
          >
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};
DropDownList.propTypes = {
  select: PropTypes.object
};

export default DropDownList;
