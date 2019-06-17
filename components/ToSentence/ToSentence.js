import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ToSentence = (props) => {
  const { items } = props;
  return (
    <>
      {items.map((item, i) => {
        if (i === items.length - 1) {
          return <Fragment key={i}>{item.name ? item.name : item}</Fragment>;
        } else if (i === items.length - 2) {
          return (
            <Fragment key={i}>{item.name ? item.name : item} and </Fragment>
          );
        }
        return <Fragment key={i}>{item.name ? item.name : item}, </Fragment>;
      })}
    </>
  );
};

ToSentence.propTypes = {
  items: PropTypes.array
};

export default ToSentence;
