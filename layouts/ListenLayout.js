import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import ListenFooter from '../components/ListenFooter/ListenFooter';
import AudioPlayer from '../components/AudioPlayer/index';

const ListenLayout = ({ children }) => (
  <>
    <AudioPlayer />
    <main className="main main-listen">{children}</main>
    <ListenFooter />
  </>
);

ListenLayout.propTypes = {
  children: PropTypes.any
};

export default ListenLayout;
