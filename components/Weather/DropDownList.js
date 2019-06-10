import React from 'react';
// import { weatherConfig } from '../../config/index';
import PropTypes from 'prop-types';

const DropDownList = (props) => {
  const { select } = props;
  return (
    <div className="section">
      <select onChange={select.handleOnChange}>
        <option defaultValue="selected">More locations</option>
      </select>
    </div>
  );
};
DropDownList.propTypes = {
  select: PropTypes.object
};

export default DropDownList;
