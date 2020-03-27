import React from 'react';
import PropTypes from 'prop-types';
import { Image, AmpImage } from '@apmg/mimas';

const ampStyles = {
  figure: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    fontSize: '0.85em',
    lineHeight: '1.2',
    padding: '1em 0'
  },
  text: {
    display: 'inline',
    paddingRight: '1em'
  },
  credit: {
    display: 'inline-block',
    color: '#4a4e4f'
  }
};

const ApmImage = ({ minimal, image, embedded, isAmp }) => {
  if (minimal) {
    return null;
  }

  function classes() {
    const position = image?.float ? `figure-${image.float}` : '';
    const size = `figure-${image?.width ? image.width : 'full'}`;
    return `figure ${position} ${size}`;
  }

  function captionCredit() {
    if (image?.credit && image.credit_url) {
      return (
        <a
          href={image.credit_url}
          style={isAmp ? ampStyles.credit : null} 
          className="figure_credit"
        >
          {image.credit}
        </a>
      );
    } else if (image?.credit) {
      return (
        <div
          style={isAmp ? ampStyles.credit : null} 
          className="figure_credit"
        >
          {image.credit}
        </div>
      );
    }
  }

  function chooseImage(embedded, isAmp = false) {
    const embeddedImage = embedded?.images?.find(
      (image) => image?.id && image?.id === image?.id
    );

    if (isAmp) {
      return (
        <AmpImage
          image={embeddedImage}
          aspectRatio={image?.preferred_aspect_ratio_slug}
          sizes="(max-width: 47.999em) 99vw, 66vw"
        />
      );
    }

    return (
      <Image
        image={embeddedImage}
        aspectRatio={image?.preferred_aspect_ratio_slug}
        sizes="(max-width: 47.999em) 99vw, 66vw"
      />
    );
  }

  return (
    <figure className={classes()}>
      {chooseImage(embedded, isAmp)}
      {image?.long_caption || image?.credit ? (
        <figcaption style={isAmp ? ampStyles.figure : null} className="figure_caption">
          {image.long_caption && (
            <div style={isAmp ? ampStyles.text : null} className="figure_text">
              {image.long_caption}
            </div>
          )}
          {captionCredit()}
        </figcaption>
      ) : (
        ''
      )}
    </figure>
  );
};

ApmImage.propTypes = {
  image: PropTypes.object,
  embedded: PropTypes.object,
  minimal: PropTypes.bool,
  isAmp: PropTypes.bool // for AMP html
};

export default ApmImage;
