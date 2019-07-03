import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import ListenFooter from '../components/ListenFooter/ListenFooter';
import AudioPlayer from '../components/AudioPlayer/index';

const ListenLayout = ({ children }) => (
  <div className="listenLayout">
    <main className="main">
      <AudioPlayer />
      {children}
    </main>
    <ListenFooter />
  </div>
);

ListenLayout.propTypes = {
  children: PropTypes.any
};

export default ListenLayout;
