import React from 'react';
import AmpIconTwitter from '../AmpIcons/AmpIconTwitter';
import AmpIconFacebook from '../AmpIcons/AmpIconFacebook';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const ampStyles = {
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fill: 'white',
  },
  twitterIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    margin: '0 5px',
    padding: '5px',
    backgroundColor: '#55acee',
  },
  facebookIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: '25px',
    height: '25px',
    margin: '0 5px',
    padding: '5px',
    backgroundColor: '#3b5998',
  },
  invisible: { display: 'none' },
};

const AmpShareSocialButtons = ({ contentUrl, title }) => {
  //Don't send the share event information to GA by default
  const shareFBEventGA = 'facebook';
  const shareTwitterEventGA = 'tweet';
  const dataLayer = null;
  const shareEventGA = false;
  const via = 'mprnews';
  const twitterLink =
    'http://twitter.com/share?url=' +
    'https://www.mprnews.org/story/' +
    contentUrl +
    '&text=' +
    title +
    '&via=' +
    via;
  const fbLink =
    'http://www.facebook.com/sharer.php?u=' +
    'https://www.mprnews.org/story/' +
    contentUrl +
    '&text=' +
    title +
    'sharer';

  const dataLayerObj = {
    event: 'GAevent',
    eventCategory: 'share',
    eventAction: 'click',
    eventLabel: shareEventGA,
    eventInteraction: 'false',
  };

  const pushLayerInfoForGA = (dataLayerObj, shareEventGA) => {
    if (shareEventGA && typeof dataLayer === 'object') {
      try {
        //push data layer through Google Tag in GTM, data lives in GA
        dataLayer.push(dataLayerObj);
      } catch (e) {
        return;
      }
    }
  };

  return (
    <>
      <div style={ampStyles.icons}>
        <Heading level={3}>Share story</Heading>
        {/* Twitter class needs to stay, it triggers GA tracking */}
        <a
          href={twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          style={ampStyles.twitterIcon}
          className="twitter"
          onClick={() => {
            pushLayerInfoForGA(dataLayerObj, shareTwitterEventGA);
          }}
        >
          <AmpIconTwitter />
          <span style={ampStyles.invisible}>Twitter</span>
        </a>
        {/* Facebook class needs to stay, it triggers GA tracking */}
        <a
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          style={ampStyles.facebookIcon}
          className="facebook"
          onClick={() => {
            pushLayerInfoForGA(dataLayerObj, shareFBEventGA);
          }}
        >
          <AmpIconFacebook />
          <span style={ampStyles.invisible}>Facebook</span>
        </a>
      </div>
    </>
  );
};

AmpShareSocialButtons.propTypes = {
  contentUrl: PropTypes.string,
  title: PropTypes.string,
};

export default AmpShareSocialButtons;
