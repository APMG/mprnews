import React from 'react';
import PropTypes from 'prop-types';
import { Figure } from '@apmg/titan';
import { Body } from '@apmg/amat';
import AmpContentHeader from './AmpContentHeader';
import ApmRelatedLinkListItemOverride from '../AmatOverrides/ApmRelatedLinkListItemOverride';
import LinkOverride from '../AmatOverrides/LinkOverride';
import ApmRelatedLinkOverride from '../AmatOverrides/ApmRelatedLinkOverride';

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
  embeddedAssetJson,
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
    <article>
      <AmpContentHeader
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

      {body && (
        <div className="content_body userContent">
          <Body
            nodeData={JSON.parse(body)}
            embedded={JSON.parse(embeddedAssetJson)}
            minimal={minimal}
            isAmp={true}
            overrides={{
              link: LinkOverride,
              apm_related_link: ApmRelatedLinkOverride,
              apm_related_link_list_item: ApmRelatedLinkListItemOverride
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
  embeddedAssetJson: PropTypes.string,
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
