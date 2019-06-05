import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Figure } from 'apm-titan';
import { Body } from 'amat-react';
import ContentHeader from './ContentHeader';

const Content = (props) => {
  const classes = classNames({
    content: true,
    [props.elementClass]: props.elementClass
  });

  return (
    <article className={classes}>
      <ContentHeader
        title={props.title}
        authors={props.authors}
        headingLevel={props.headingLevel}
        publishDate={props.publishDate}
        subtitle={props.subtitle}
        tag={props.tag}
      />

      {props.image && (
        <Figure
          caption={props.imageCaption}
          credit={props.imageCredit}
          creditHref={props.imageCreditHref}
          elementClass={'content_figure'}
          image={props.image}
        />
      )}

      {props.body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(props.body)}
            embedded={JSON.parse(props.embeddedAssetJson)}
          />
        </div>
      )}
    </article>
  );
};

Content.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string
    })
  ),
  body: PropTypes.string,
  elementClass: PropTypes.string,
  embeddedAssetJson: PropTypes.string,
  headingLevel: PropTypes.number,
  image: PropTypes.element,
  imageCaption: PropTypes.string,
  imageCredit: PropTypes.string,
  imageCreditHref: PropTypes.string,
  publishDate: PropTypes.string,
  subtitle: PropTypes.string,
  tag: PropTypes.shape({
    tagName: PropTypes.string,
    to: PropTypes.string
  }),
  title: PropTypes.string.isRequired
};

export default Content;
