import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@apmg/mimas';
import { globals } from '../../config/globals';
import { collectionLinkData } from '../../utils/utils';
import AmpContent from '../../components/AmpContent/AmpContent';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const AmpPage = ({ data: { page } }) => {
  const img = fishForSocialMediaImage(page);

  return (
    <>
      <Metatags
        title={page.title}
        fullSlug={page.canonicalSlug}
        description={page.descriptionText}
        image={img?.url}
        imageHeight={img?.height}
        imageWidth={img?.width}
        imageAlt={page?.primaryVisuals?.social?.shortCaption}
        isAmp={page.supportedOutputFormats?.indexOf('amp') > -1}
        topic={page.primaryCollection?.title}
        contentType="article"
      />

      <AmpContent
        title={page.title}
        subtitle={page.subtitle}
        body={page.body}
        image={
          page.primaryVisuals?.lead && (
            <Image
              key={page.primaryVisuals.lead.fallback}
              image={page.primaryVisuals.lead}
              aspectRatio="uncropped"
              sizes={globals.sizes.primaryVisuals}
              alt={page.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={page.primaryVisuals?.lead?.longCaption}
        imageCredit={page.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={page.primaryVisuals?.lead?.credit?.url}
        embeddedAssetJson={page.embeddedAssetJson}
        tag={collectionLinkData(page.primaryCollection)}
        elementClass="page"
      />
    </>
  );
};

AmpPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      canonicalSlug: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      body: PropTypes.string,
      descriptionText: PropTypes.string,
      supportedOutputFormats: PropTypes.array,
      image: PropTypes.element,
      imageCaption: PropTypes.string,
      imageCredit: PropTypes.string,
      imageCreditHref: PropTypes.string,
      primaryVisuals: PropTypes.any,
      primaryCollection: PropTypes.any,
      publishDate: PropTypes.string,
      embeddedAssetJson: PropTypes.string,
      tag: PropTypes.shape({
        tagName: PropTypes.string,
        to: PropTypes.string
      })
    })
  })
};

export default AmpPage;
