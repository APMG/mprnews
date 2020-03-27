import React from 'react';
import PropTypes from 'prop-types';
import { Time } from '@apmg/titan';
import { globals } from '../../config/globals';
import { collectionLinkData } from '../../utils/utils';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import Content from '../../components/Content/Content';
import DonateAsk from '../../components/DonateAsk/DonateAsk';
import Metatags from '../../components/Metatags/Metatags';
import ShareSocialButtons from '../../components/ShareSocialButtons/ShareSocialButtons';
import { Image } from '@apmg/mimas';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import { showInfoAlert, audioDownloadPrefix } from '../../utils/utils';
import Alert from '../../components/Alert/Alert';

const Episode = ({ data: { episode, alertConfig } }) => {
  const alerts = JSON.parse(alertConfig.json);
  const img = fishForSocialMediaImage(episode);
  let authors;

  if (episode.contributors) {
    authors = episode.contributors.map((contributor) => {
      let thisString = `${
        contributor.profile?.firstName ? contributor.profile.firstName : ''
      } ${contributor.profile?.lastName ? contributor.profile.lastName : ''}`;
      return {
        // prettier-ignore
        title: `${thisString}`,
        href: '/people/[...slug]',
        as: `/people/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  return (
    <>
      <Metatags
        title={episode.title}
        fullSlug={`episode/${episode.canonicalSlug}`}
        description={episode.descriptionText}
        image={img?.url}
        imageHeight={img?.height}
        imageWidth={img?.width}
        imageAlt={episode?.primaryVisuals?.social?.shortCaption}
        isAmp={episode.supportedOutputFormats?.indexOf('amp') > -1}
        topic={episode.primaryCollection?.title}
        contentType="article"
        publishDate={episode.publishDate}
        modifiedDate={episode.updatedAt}
      />
      {showInfoAlert(alerts, episode.resourceType) ? (
        <div className="section section-md">
          <Alert info={alerts.info} />
        </div>
      ) : null}
      <Content
        title={episode.title}
        subtitle={episode.subtitle}
        authors={authors}
        body={episode.body}
        shareButtons={
          <ShareSocialButtons
            contentUrl={`episode/${episode.canonicalSlug}`}
            title={episode.title}
          />
        }
        audioPlayButton={
          episode.primaryAudio && (
            <AudioPlayButton
              audioSource={audioDownloadPrefix(
                episode.primaryAudio.encodings[0].playFilePath
              )}
              audioTitle={episode.primaryAudio.title}
              label="Listen"
              elementClass="playButton-primary"
              showTitle={true}
            />
          )
        }
        image={
          episode.primaryVisuals?.lead && (
            <Image
              key={episode.primaryVisuals.lead.fallback}
              image={episode.primaryVisuals.lead}
              sizes={globals.sizes.primaryVisuals}
              alt={episode.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={episode.primaryVisuals?.lead?.longCaption}
        imageCredit={episode.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={episode.primaryVisuals?.lead?.credit?.url}
        publishDate={<Time dateTime={episode.publishDate} />}
        embeddedAssetJson={episode.embeddedAssetJson}
        tag={collectionLinkData(episode.primaryCollection)}
        elementClass="episode"
      />
      <DonateAsk />
    </>
  );
};

Episode.propTypes = {
  data: PropTypes.shape({
    alertConfig: PropTypes.object,
    episode: PropTypes.shape({
      canonicalSlug: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      authors: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          href: PropTypes.string
        })
      ),
      body: PropTypes.string,
      resourceType: PropTypes.string,
      contributors: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      supportedOutputFormats: PropTypes.array,
      description: PropTypes.string,
      descriptionText: PropTypes.string,
      image: PropTypes.element,
      imageCaption: PropTypes.string,
      imageCredit: PropTypes.string,
      imageCreditHref: PropTypes.string,
      primaryVisuals: PropTypes.any,
      primaryCollection: PropTypes.any,
      primaryAudio: PropTypes.any,
      publishDate: PropTypes.string,
      updatedAt: PropTypes.string,
      embeddedAssetJson: PropTypes.string,
      tag: PropTypes.shape({
        tagName: PropTypes.string,
        to: PropTypes.string
      })
    })
  })
};

export default Episode;
