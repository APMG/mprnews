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

const ApmImageOverride = ({ minimal, image, embedded, isAmp }) => {
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
        <a href={image.credit_url} className="figure_credit">
          {image.credit}
        </a>
      );
    } else if (image?.credit) {
      return <div className="figure_credit">{image.credit}</div>;
    }
  }

  function ampCaptionCredit() {
    if (image?.credit && image.credit_url) {
      return (
        <a
          style={ampStyles.credit}
          href={image.credit_url}
          className="figure_credit"
        >
          {image.credit}
        </a>
      );
    } else if (image?.credit) {
      return (
        <div style={ampStyles.credit} className="figure_credit">
          {image.credit}
        </div>
      );
    }
  }

  function chooseImage(embedded) {
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
      {chooseImage(embedded)}
      {image?.long_caption || image?.credit ? (
        <figcaption className="figure_caption">
          {image.long_caption && (
            <div className="figure_text">{image.long_caption}</div>
          )}
          {isAmp ? ampCaptionCredit() : captionCredit()}
        </figcaption>
      ) : (
        ''
      )}
    </figure>
  );
};

ApmImageOverride.propTypes = {
  image: PropTypes.object,
  embedded: PropTypes.object,
  minimal: PropTypes.bool,
  isAmp: PropTypes.bool // for AMP html
};

export default ApmImageOverride;
