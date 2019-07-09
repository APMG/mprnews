import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import ListenHeader from '../components/ListenHeader/ListenHeader';
import ListenFooter from '../components/ListenFooter/ListenFooter';
import AudioPlayer from '../components/AudioPlayer/index';

const ListenLayout = ({ children }) => (
  <div className="listenLayout">
    <ListenHeader />
    <main className="main main-listen">
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
