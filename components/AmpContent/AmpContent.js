import React from 'react';
import PropTypes from 'prop-types';
import { Figure } from '@apmg/titan';
import { Body } from '@apmg/amat';
import AmpContentHeader from './AmpContentHeader';
import AmpLinkOverride from '../AmatOverrides/AmpLinkOverride';
import ApmRelatedLinkListItemOverride from '../AmatOverrides/ApmRelatedLinkListItemOverride';
import ApmRelatedLinkOverride from '../AmatOverrides/ApmRelatedLinkOverride';
import ApmRelatedListOverride from '../AmatOverrides/ApmRelatedListOverride';
import ApmImageOverride from '../AmatOverrides/ApmImageOverride';
import ApmCustomHtmlOverride from '../AmatOverrides/ApmCustomHtmlOverride';
import AmpOembedFactory from '../AmpOembed/AmpOembedFactory';

const ampStyles = {
  article: {
    fontFamily: '"Noto Serif", Georgia, serif',
    fontSize: '.9375em',
    lineHeight: '1.5',
    color: '#191a1a',
    maxWidth: '40em',
    margin: '1em auto'
  },
  sharing: {
    margin: '2em 1em 1em',
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    fontSize: '0.85em'
  },
  invisible: { display: 'none' }
};

const AmpContent = ({
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
  redistributable
}) => {
  let largest;
  if (image && redistributable) {
    const instances = image?.props.image.aspect_ratios.uncropped.instances;
    largest = instances.reduce((accum = { width: 0 }, curr) => {
      return accum.width > curr.width ? accum : curr;
    });
  }

  return (
    <article style={ampStyles.article}>
      <AmpContentHeader
        title={title}
        authors={authors}
        headingLevel={headingLevel}
        publishDate={publishDate}
        subtitle={subtitle}
        dateline={dateline}
        tag={tag}
      />
      {shareButtons && (
        <div className="content_social" style={ampStyles.sharing}>
          {shareButtons}
        </div>
      )}

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

      {body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(body)}
            embedded={embeddedAssets}
            minimal={minimal}
            isAmp={true}
            overrides={{
              link: AmpLinkOverride,
              apm_related_link: ApmRelatedLinkOverride,
              apm_related_link_list_item: ApmRelatedLinkListItemOverride,
              apm_related_list: ApmRelatedListOverride,
              apm_image: ApmImageOverride,
              apm_custom_html: ApmCustomHtmlOverride,
              apm_oembed: AmpOembedFactory
            }}
          />
        </div>
      )}
    </article>
  );
};

AmpContent.propTypes = {
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
  redistributable: PropTypes.bool
};

export default AmpContent;
