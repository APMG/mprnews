import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Figure } from '@apmg/titan';
import { Body } from '@apmg/amat';
import ContentHeader from './ContentHeader';

const Content = ({
  elementClass,
  title,
  subtitle,
  dateline,
  authors,
  headingLevel,
  publishDate,
  audioPlayButton,
  body,
  embeddedAssetJson,
  tag,
  image,
  imageCaption,
  imageCredit,
  imageCreditHref,
  minimal,
  redistributable
}) => {
  const classes = classNames({
    content: true,
    [elementClass]: elementClass
  });
  let largest;
  if (image && redistributable) {
    const instances = image?.props.image.aspect_ratios.uncropped.instances;
    largest = instances.reduce((accum = { width: 0 }, curr) => {
      return accum.width > curr.width ? accum : curr;
    });
  }
  return (
    <article className={classes}>
      <ContentHeader
        title={title}
        authors={authors}
        headingLevel={headingLevel}
        publishDate={publishDate}
        subtitle={subtitle}
        dateline={dateline}
        tag={tag}
      />

      {audioPlayButton && (
        <div className="content_audio">{audioPlayButton}</div>
      )}

      {image && (
        <div className="content_primaryVisual">
          <Figure
            caption={imageCaption}
            credit={imageCredit}
            creditHref={imageCreditHref}
            elementClass={'content_figure'}
            image={image}
          />
          {largest && <a href={largest.url}>Download full resolution image</a>}
        </div>
      )}

      {body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(body)}
            embedded={JSON.parse(embeddedAssetJson)}
            minimal={minimal}
          />
        </div>
      )}
    </article>
  );
};

Content.propTypes = {
  elementClass: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dateline: PropTypes.string,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.string,
  audioPlayButton: PropTypes.node,
  body: PropTypes.string,
  embeddedAssetJson: PropTypes.string,
  tag: PropTypes.shape({
    tagName: PropTypes.string,
    to: PropTypes.string
  }),
  image: PropTypes.element,
  imageCaption: PropTypes.string,
  imageCredit: PropTypes.string,
  imageCreditHref: PropTypes.string,
  minimal: PropTypes.bool,
  redistributable: PropTypes.bool
};

export default Content;
