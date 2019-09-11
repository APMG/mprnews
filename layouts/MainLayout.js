import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import AudioPlayer from '../components/AudioPlayer';
import Footer from '../components/Footer/Footer';

import '../styles/index.scss';

const MainLayout = ({ children, memberDriveData }) => {
  console.log(memberDriveData);
  return (
    <>
      <Header memberDriveData={memberDriveData} />
      <AudioPlayer />
      {memberDriveData && memberDriveData.webshowad && (
        <div id="membership-ad-frame-wrapper" className="advert">
          <div id="membership-ad-mobile"></div>
          <div id="membership-ad"></div>
        </div>
      )}
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <Footer />
      {memberDriveData && memberDriveData.splashshowad && (
        <div id="membership-splash-frame-wrapper" className="advert"></div>
      )}
    </>
  );
};

MainLayout.propTypes = {
  memberDriveData: PropTypes.object,
  children: PropTypes.any
};

export default MainLayout;
