import React from 'react';
import Icon from '../Icons/Icon';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const ShareSocialButtons = ({ shareText, contentUrl, title }) => {
  //Don't send the share event information to GA by default
  const shareFBEventGA = 'facebook';
  const shareTwitterEventGA = 'tweet';
  const dataLayer = null;
  const shareEventGA = false;
  const via = 'mprnews';
  const twitterLink =
    'http://twitter.com/share?url=' +
    'https://www.mprnews.org/' +
    contentUrl +
    '&text=' +
    title +
    '&via=' +
    via;
  const fbLink =
    'http://www.facebook.com/sharer.php?u=' +
    'https://www.mprnews.org/' +
    contentUrl +
    '&text=' +
    title +
    'sharer';
  const mailLink =
    `mailto:?subject=MPR News: ${title}` +
    `&body=Check out this article from MPR News: https://www.mprnews.org/${contentUrl}`;

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
    <div className="shareSocialButtons hList">
      <Heading level={3} className="hdg hdg-5">
        {shareText ? shareText : 'Share story'}
      </Heading>
      {/* Twitter class needs to stay, it triggers GA tracking */}
      <a
        href={twitterLink}
        target="_blank"
        rel="noopener noreferrer"
        className="shareSocialButtons_twitter twitter"
        onClick={() => {
          pushLayerInfoForGA(dataLayerObj, shareTwitterEventGA);
        }}
      >
        <Icon name="twitter" />
        <span className="invisible">Twitter</span>
      </a>
      {/* Facebook class needs to stay, it triggers GA tracking */}
      <a
        href={fbLink}
        target="_blank"
        rel="noopener noreferrer"
        className="shareSocialButtons_facebook facebook"
        onClick={() => {
          pushLayerInfoForGA(dataLayerObj, shareFBEventGA);
        }}
      >
        <Icon name="facebook" />
        <span className="invisible">Facebook</span>
      </a>
      <a
        href={mailLink}
        target="_blank"
        rel="noopener noreferrer"
        className="shareSocialButtons_email email"
      >
        <Icon name="mail" />
        <span className="invisible">Email</span>
      </a>
    </div>
  );
};

ShareSocialButtons.propTypes = {
  contentUrl: PropTypes.string,
  title: PropTypes.string,
  shareText: PropTypes.string,
};

export default ShareSocialButtons;
