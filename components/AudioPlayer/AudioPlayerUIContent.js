import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AudioPlayerContext from '../../context/AudioPlayerContext';
import classNames from 'classnames';
import AudioListenLiveButton from '../AudioListenLiveButton/AudioListenLiveButton';

const AudioPlayerUIContent = (props) => {
  const animationSpeed = 40; // px per second
  const scrollingTitlePadding = 50; // in px; magic-numbery value matching the padding between scrolling titles
  const innerTitleSelector = '#js-scroll-content';

  const context = useContext(AudioPlayerContext);
  const [isScrolling, setIsScrolling] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({
    animationDuration: '5s',
  });
  const titleRef = useRef();

  const innerClasses = classNames({
    player_titleInner: true,
    'is-scrolling': isScrolling,
  });

  // Turns scrolling animation on and off
  const animate = () => {
    const titleEl = titleRef.current;

    if (!titleEl) return;

    if (
      titleEl.parentElement.offsetWidth < getTitleWidth() &&
      context.isAudioPlaying
    ) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  // Determines how fast to scroll based on the title width
  const setScrollSpeed = (titleWidth) => {
    const combinedWidth = titleWidth + scrollingTitlePadding;
    const duration = `${combinedWidth / animationSpeed}s`;
    setAnimationStyle({ animationDuration: duration });
  };

  // Return the DOM width of the title text
  const getTitleWidth = () => {
    return titleRef.current.querySelector(innerTitleSelector).offsetWidth;
  };

  // Only runs when audio is played/paused
  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    // remove the event listener on unmount
    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [context.isAudioPlaying]);

  // Only runs when the title prop changes
  useEffect(() => {
    if (!titleRef.current) return;
    setScrollSpeed(getTitleWidth());
  }, [props.title]);

  return (
    <div className="player_content">
      <AudioListenLiveButton audioSource="" audioTitle="" audioSubtitle="" />

      {props.label && (
        <div className="player_label js-player-label">{props.label}</div>
      )}
      {props.title && (
        <div className="player_title js-player-title">
          <div
            className={innerClasses}
            style={animationStyle}
            ref={titleRef}
            data-title={props.title}
          >
            <span id="js-scroll-content">{props.title}</span>
          </div>
        </div>
      )}
      {props.subtitle && <div className="player_subhead">{props.subtitle}</div>}
    </div>
  );
};

AudioPlayerUIContent.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AudioPlayerUIContent;
