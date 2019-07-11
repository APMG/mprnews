import React from 'react';
import Icon from '../Icons/Icon';
import PropTypes from 'prop-types';
import { Heading } from '@apmg/titan';

const ShareSocialButtons = ({ storyUrl, title }) => {
  //Don't send the share event information to GA by default
  const shareEventGA = false;
  const dataLayer = null;

  const dataLayerObj = {
    event: 'GAevent',
    eventCategory: 'share',
    eventAction: 'click',
    eventLabel: shareEventGA,
    eventInteraction: 'false'
  };
  const openTweetNewTab = (storyUrl, dataLayerObj, shareEventGA, title) => {
    window.open(
      'http://twitter.com/share?url=' +
        'https://www.mprnews.org/story' +
        storyUrl +
        '&text=' +
        title +
        '&via=' +
        'mprnews',
      +'sharer',
      'toolbar=0,status=0,width=626,height=436'
    );
    //This is for Google Analytics tracking, wired up in Google Tag Manager
    shareEventGA = 'tweet';
    if (shareEventGA && typeof dataLayer === 'object') {
      try {
        //push data layer through Google Tag in GTM, data lives in GA
        dataLayer.push(dataLayerObj);
      } catch (e) {
        return;
      }
    }
  };

  const openFbMsgNewTab = (storyUrl, dataLayerObj, shareEventGA, title) => {
    window.open(
      'http://www.facebook.com/sharer.php?u=' +
        'https://www.mprnews.org/story' +
        storyUrl +
        '&text=' +
        title,
      'sharer',
      'toolbar=0,status=0,width=626,height=436'
    );
    //This is for Google Analytics tracking, wired up in Google Tag Manager
    shareEventGA = 'facebook';
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
        Share story
      </Heading>

      <a
        href="/"
        className="shareSocialButtons_twitter"
        onClick={(e) => {
          e.preventDefault();
          openTweetNewTab(storyUrl, dataLayerObj, shareEventGA, title);
        }}
      >
        <Icon name="twitter" />
        <span className="invisible">Twitter</span>
      </a>

      <a
        href="/"
        className="shareSocialButtons_facebook"
        onClick={(e) => {
          e.preventDefault();
          openFbMsgNewTab(storyUrl, dataLayerObj, shareEventGA, title);
        }}
      >
        <Icon name="facebook" />
        <span className="invisible">Facebook</span>
      </a>
    </div>
  );
};

ShareSocialButtons.propTypes = {
  storyUrl: PropTypes.string,
  title: PropTypes.string
};

export default ShareSocialButtons;
