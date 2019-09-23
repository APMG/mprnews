import React from 'react';
import PropTypes from 'prop-types';
import { globals } from '../../config/globals';
import { Image } from '@apmg/mimas';
import { Time } from '@apmg/titan';
import { collectionLinkData } from '../../utils/utils';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import Content from '../../components/Content/Content';
import Metatags from '../../components/Metatags/Metatags';
import ShareSocialButtons from '../../components/ShareSocialButtons/ShareSocialButtons';
import { showInfoAlert } from '../../utils/utils';
import Alert from '../../components/Alert/Alert';

const Story = ({ data: { story, alertConfig }, minimal }) => {
  //
  const alerts = JSON.parse(alertConfig.json);
  const img = fishForSocialMediaImage(story);
  let authors;
  if (story && story.contributors) {
    authors = story.contributors.map((contributor) => {
      return {
        title: `${contributor.profile?.title}`,
        href: `/profile?slug=${contributor.profile?.canonicalSlug}`,
        as: `/people/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  return (
    <>
      <Metatags
        title={story.title}
        fullSlug={`story/${story?.canonicalSlug}`}
        description={story.descriptionText}
        image={img?.url}
        imageHeight={img?.height}
        imageWidth={img?.width}
        imageAlt={story.primaryVisuals.lead.shortCaption}
        isAmp={story.supportedOutputFormats?.indexOf('amp') > -1}
        topic={story?.primaryCollection?.title}
        contentType="article"
      />
      {showInfoAlert(alerts, story.resourceType) ? (
        <div className="section section-md">
          <Alert info={alerts.info} />
        </div>
      ) : null}
      <Content
        title={story.title}
        subtitle={story.subtitle}
        dateline={story.dateline}
        authors={authors}
        body={story.body}
        minimal={minimal}
        redistributable={story.primaryVisuals?.lead?.rights?.redistributable}
        shareButtons={
          !minimal && (
            <ShareSocialButtons
              contentUrl={story.canonicalSlug}
              title={story.title}
            />
          )
        }
        audioPlayButton={
          story.primaryAudio &&
          story.primaryAudio.encodings.length > 0 && (
            <AudioPlayButton
              audioSource={story.primaryAudio.encodings[0].httpFilePath}
              audioTitle={story.primaryAudio.title}
              label="Listen"
              elementClass="playButton-primary"
            />
          )
        }
        image={
          story.primaryVisuals?.lead && (
            <Image
              key={story.primaryVisuals.lead.fallback}
              image={story.primaryVisuals.lead}
              sizes={globals.sizes.primaryVisuals}
              alt={story.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={story.primaryVisuals?.lead?.longCaption}
        imageCredit={story.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={story.primaryVisuals?.lead?.credit?.url}
        publishDate={
          <Time
            dateTime={story.publishDate}
            formatString="MMMM D, YYYY h:mm aa"
          />
        }
        embeddedAssetJson={story.embeddedAssetJson}
        tag={collectionLinkData(story.primaryCollection)}
        elementClass="story"
      />
      {minimal && (
        <div className="newspartners_notice">
          This story originally appeared at:{' '}
          {`https://www.mprnews.org/story/${story.canonicalSlug}`} of story
          Questions or requests? Contact MPR News editor Meg Martin at
          newspartners@mpr.org © 2019 Minnesota Public Radio. All rights
          reserved.
        </div>
      )}
    </>
  );
};

Story.propTypes = {
  data: PropTypes.shape({
    alertConfig: PropTypes.object,
    story: PropTypes.shape({
      canonicalSlug: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      dateline: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          href: PropTypes.string
        })
      ),
      body: PropTypes.string,
      resourceType: PropTypes.string,
      contributors: PropTypes.array,
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
      embeddedAssetJson: PropTypes.string,
      tag: PropTypes.shape({
        tagName: PropTypes.string,
        to: PropTypes.string
      })
    })
  }),
  minimal: PropTypes.bool
};

export default Story;
