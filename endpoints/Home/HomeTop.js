import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const HomeTop = (props) => {
  return (
    <Link href={props.info.url}>
      <a className="alertHome">
        <div className="alertHome_prefix">
          <h2 className="hdg hdg-3">{`${props.info.prefix}`}</h2>
        </div>
        <div className="alertHome_title">
          {console.log(props.info.title)}
          <h2 className="hdg hdg-3">{`${props.info.title}`} </h2>
        </div>
      </a>
    </Link>
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
