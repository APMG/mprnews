import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Figure } from '@apmg/titan';
import { Body } from 'amat-react';
import ContentHeader from './ContentHeader';

const Content = ({
  elementClass,
  title,
  subtitle,
  authors,
  headingLevel,
  publishDate,
  body,
  embeddedAssetJson,
  tag,
  image,
  imageCaption,
  imageCredit,
  imageCreditHref
}) => {
  const classes = classNames({
    content: true,
    [elementClass]: elementClass
  });

  return (
    <article className={classes}>
      <ContentHeader
        title={title}
        authors={authors}
        headingLevel={headingLevel}
        publishDate={publishDate}
        subtitle={subtitle}
        tag={tag}
      />

      {image && (
        <Figure
          caption={imageCaption}
          credit={imageCredit}
          creditHref={imageCreditHref}
          elementClass={'content_figure'}
          image={image}
        />
      )}

      {body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(body)}
            embedded={JSON.parse(embeddedAssetJson)}
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
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.string,
  body: PropTypes.string,
  embeddedAssetJson: PropTypes.string,
  tag: PropTypes.shape({
    tagName: PropTypes.string,
    to: PropTypes.string
  }),
  image: PropTypes.element,
  imageCaption: PropTypes.string,
  imageCredit: PropTypes.string,
  imageCreditHref: PropTypes.string
};

export default Content;
