import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Figure } from '@apmg/titan';
import { Body } from '@apmg/amat';
import ContentHeader from './ContentHeader';
import LinkOverride from '../AmatOverrides/LinkOverride';
import ApmRelatedLinkListItemOverride from '../AmatOverrides/ApmRelatedLinkListItemOverride';
import ApmRelatedLinkOverride from '../AmatOverrides/ApmRelatedLinkOverride';
import ApmRelatedListOverride from '../AmatOverrides/ApmRelatedListOverride';
import ApmImageOverride from '../AmatOverrides/ApmImageOverride';
import ApmCustomHtmlOverride from '../AmatOverrides/ApmCustomHtmlOverride';

const Content = ({
  elementClass,
  title,
  subtitle,
  dateline,
  authors,
  headingLevel,
  publishDate,
  shareButtons,
  audioPlayButton,
  body,
  embeddedAssets,
  tag,
  image,
  imageCaption,
  imageCredit,
  imageCreditHref,
  minimal,
  redistributable,
  video
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
      {shareButtons && <div className="content_social">{shareButtons}</div>}

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
          {largest && minimal && (
            <div className="content_newsPartners">
              <a className="link" href={largest.url}>
                Download full resolution image
              </a>
            </div>
          )}
        </div>
      )}
      {video && (
        <div className="content_primaryVisual">
          <figure className="figure">
            <video id={video.credit.name} autoPlay={true} muted={true}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <figcaption className="figure_caption">
              <div className="figure_caption_content">{video.caption}</div>
              <span className="figure_credit">{video.credit.name}</span>
            </figcaption>
          </figure>
        </div>
      )}

      {body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(body)}
            embedded={embeddedAssets}
            minimal={minimal}
            isAmp={false}
            overrides={{
              link: LinkOverride,
              apm_related_link: ApmRelatedLinkOverride,
              apm_related_link_list_item: ApmRelatedLinkListItemOverride,
              apm_related_list: ApmRelatedListOverride,
              apm_image: ApmImageOverride,
              apm_custom_html: ApmCustomHtmlOverride
            }}
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
      title: PropTypes.string,
      href: PropTypes.string
    })
  ),
  headingLevel: PropTypes.number,
  publishDate: PropTypes.node,
  audioPlayButton: PropTypes.node,
  shareButtons: PropTypes.node,
  body: PropTypes.string,
  embeddedAssets: PropTypes.object,
  tag: PropTypes.shape({
    tagName: PropTypes.string,
    to: PropTypes.string
  }),
  image: PropTypes.node,
  imageCaption: PropTypes.string,
  imageCredit: PropTypes.string,
  imageCreditHref: PropTypes.string,
  minimal: PropTypes.bool,
  redistributable: PropTypes.bool,
  video: PropTypes.object
};

export default Content;
