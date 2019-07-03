import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import ListenFooter from '../components/ListenFooter/ListenFooter';
import AudioPlayer from '../components/AudioPlayer/index';

const ListenLayout = ({ children }) => (
  <>
    <main className="main main-listen">
      <AudioPlayer />
      {children}
      <ListenFooter />
    </main>
  </>
);

ListenLayout.propTypes = {
  children: PropTypes.any
};

export default ListenLayout;
