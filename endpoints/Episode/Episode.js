import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './episode.gql';
import { Loading, Time } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import { globals } from '../../config/globals';
import { collectionLinkData } from '../../utils/utils';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import Content from '../../components/Content/Content';
import Metatags from '../../components/Metatags/Metatags';
import ShareSocialButtons from '../../components/ShareSocialButtons/ShareSocialButtons';

const Episode = ({ slug, previewToken }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }}
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (error) return <QueryError error={error.message} />;
      if (loading) return <Loading />;

      if (data.episode === null) return <ErrorPage statusCode={404} />;

      return <EpisodeInner episode={data.episode} />;
    }}
  </Query>
);

const EpisodeInner = ({ episode }) => {
  let authors;

  if (episode.contributors) {
    authors = episode.contributors.map((contributor) => {
      let thisString = `${
        contributor.profile?.firstName ? contributor.profile.firstName : ''
      } ${contributor.profile?.lastName ? contributor.profile.lastName : ''}`;
      return {
        // prettier-ignore
        title: `${thisString}`,
        href: `/profile?slug=${contributor.profile?.canonicalSlug}`,
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
        image={fishForSocialMediaImage(episode)}
        isAmp={episode.supportedOutputFormats?.indexOf('amp') > -1}
        topic={episode.primaryCollection?.title}
        contentType="article"
      />

      <Content
        title={episode.title}
        subtitle={episode.subtitle}
        authors={authors}
        body={episode.body}
        shareButtons={
          <ShareSocialButtons
            contentUrl={episode.canonicalSlug}
            title={episode.title}
          />
        }
        audioPlayButton={
          episode.primaryAudio && (
            <AudioPlayButton
              audioSource={episode.primaryAudio.encodings[0].httpFilePath}
              audioTitle={episode.primaryAudio.title}
              label="Listen"
              elementClass="playButton-primary"
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
    </>
  );
};

Episode.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

EpisodeInner.propTypes = {
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
    contributors: PropTypes.array,
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
    embeddedAssetJson: PropTypes.string,
    tag: PropTypes.shape({
      tagName: PropTypes.string,
      to: PropTypes.string
    })
  })
};

export default Episode;
