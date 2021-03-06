import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';
import { AmpImage } from '@apmg/mimas';
import { Time } from '@apmg/titan';
import { collectionLinkData } from '../../utils/utils';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import AmpAudioPlayButton from '../../components/AmpAudioPlayButton/AmpAudioPlayButton';
import AmpContent from '../../components/AmpContent/AmpContent';
import Metatags from '../../components/Metatags/Metatags';
import AmpShareSocialButtons from '../../components/AmpShareSocialButtons/AmpShareSocialButtons';
import { showInfoAlert, audioDownloadPrefix } from '../../utils/utils';
import AmpAlert from '../../components/AmpAlert/AmpAlert';

const AmpStory = ({ data: { story, alertConfig }, minimal }) => {
  const alerts = JSON.parse(alertConfig.json);
  const redistributable = story?.primaryVisuals?.lead?.rights?.redistributable;
  const displayableImage =
    story?.primaryVisuals?.lead && !(minimal && !redistributable); //  an image exists and not a newspartner story with non-distributable image

  const socialMediaImage =
    story?.primaryVisuals?.lead ||
    (story?.primaryVisuals?.social && !(minimal && !redistributable)); //  an image exists and not a newspartner story with non-distributable image

  const img = fishForSocialMediaImage(story, socialMediaImage);
  let authors;

  if (story?.contributors && story.contributors.length > 0) {
    authors = story.contributors.map((contributor) => {
      return {
        title: `${contributor.profile?.title}`,
        href: `/profile?slug=${contributor.profile?.canonicalSlug}`,
        as: `/people/${contributor.profile?.canonicalSlug}`,
      };
    });
  }

  return (
    <>
      <Metatags
        title={story.title}
        shortTitle={story.shortTitle}
        fullSlug={`story/${story?.canonicalSlug}`}
        description={story.descriptionText}
        image={img?.url}
        imageHeight={img?.height}
        imageWidth={img?.width}
        imageAlt={story?.primaryVisuals?.social?.shortCaption}
        isAmp={false} // Poorly named variable. Set to false so no link is made to self
        topic={story?.primaryCollection?.title}
        contentType="article"
        publishDate={
          <Time
            dateTime={story.publishDate}
            formatString="MMMM d, yyyy h:mm aaaa"
          />
        }
        modifiedDate={story.updatedAt}
        authors={authors}
      />

      {showInfoAlert(alerts, story.resourceType) ? (
        <div className="section section-md">
          <AmpAlert info={alerts.info} />
        </div>
      ) : null}
      <AmpContent
        title={story.title}
        subtitle={story.subtitle}
        dateline={story.dateline}
        authors={authors}
        body={story.body}
        minimal={minimal}
        redistributable={redistributable}
        shareButtons={
          !minimal && (
            <AmpShareSocialButtons
              contentUrl={story.canonicalSlug}
              title={story.title}
            />
          )
        }
        audioPlayButton={
          story.primaryAudio &&
          story.primaryAudio.encodings.length > 0 && (
            <AmpAudioPlayButton
              audioSource={audioDownloadPrefix(
                story.primaryAudio.encodings[0].playFilePath
              )}
              audioTitle={story.primaryAudio.title}
            />
          )
        }
        image={
          displayableImage && (
            <AmpImage
              key={story.primaryVisuals?.lead.fallback}
              image={story.primaryVisuals?.lead}
              sizes={globals.sizes?.primaryVisuals}
              alt={story.primaryVisuals?.lead?.shortCaption}
            />
          )
        }
        imageCaption={story.primaryVisuals?.lead?.longCaption}
        imageCredit={story.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={story.primaryVisuals?.lead?.credit?.url}
        publishDate={
          <Time
            dateTime={story.publishDate}
            formatString="MMMM d, yyyy h:mm aaaa"
          />
        }
        embeddedAssets={story.embeddedAssets}
        tag={collectionLinkData(story.primaryCollection)}
        elementClass="story"
      />
      {minimal && (
        <div className="newspartners_notice">
          This story originally appeared at:{' '}
          {`https://www.mprnews.org/story/${story.canonicalSlug}`} of story
          Questions or requests? Contact MPR News editor Meg Martin at
          newspartners@mpr.org © 2020 Minnesota Public Radio. All rights
          reserved.
        </div>
      )}
    </>
  );
};

AmpStory.propTypes = {
  data: PropTypes.shape({
    alertConfig: PropTypes.object,
    story: PropTypes.shape({
      canonicalSlug: PropTypes.string,
      title: PropTypes.string,
      shortTitle: PropTypes.string,
      subtitle: PropTypes.string,
      dateline: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          href: PropTypes.string,
        })
      ),
      body: PropTypes.string,
      resourceType: PropTypes.string,
      contributors: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      supportedOutputFormats: PropTypes.array,
      descriptionText: PropTypes.string,
      image: PropTypes.element,
      imageCaption: PropTypes.string,
      imageCredit: PropTypes.string,
      imageCreditHref: PropTypes.string,
      primaryAudio: PropTypes.any,
      primaryCollection: PropTypes.any,
      primaryVisuals: PropTypes.any,
      publishDate: PropTypes.string,
      updatedAt: PropTypes.string,
      embeddedAssets: PropTypes.object,
      tag: PropTypes.shape({
        tagName: PropTypes.string,
        to: PropTypes.string,
      }),
    }),
  }),
  minimal: PropTypes.bool,
};

export default AmpStory;
