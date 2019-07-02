import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const HomeTop = (props) => {
  return (
    <div>
      {props.info?.alert && props.info?.show_on?.indexOf('home') > -1 && (
        <Link href={props.info.url}>
          <a className="alert-box">{`${props.info.prefix} ${props.info.title}`}</a>
        </Link>
      )}
    </div>
  );
};

HomeTop.propTypes = {
  info: PropTypes.shape({
    alert: PropTypes.bool,
    info: PropTypes.shape({
      show_on: PropTypes.object
    }),
    prefix: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  })
};

export default HomeTop;
