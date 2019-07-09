import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { collectionLinkData } from '../../utils/utils';
import { format } from 'date-fns';
import Content from '../../components/Content/Content';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import query from './episode.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const Episode = ({ slug, previewToken }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading episode</div>;
      if (loading) return <Loading />;

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
        name: `${thisString}`,
        href: `/profiles/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  const socialImage = fishForSocialMediaImage(episode);
  const tags = [
    {
      key: 'description',
      name: 'description',
      content: episode.descriptionText
    },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];
  const links = [
    {
      key: 'amphtml',
      rel: 'amphtml',
      href: `https://www.mprnews.org/amp/episode/${episode.canonicalSlug}`
    }
  ];

  return (
    <>
      <Metatags title={episode.title} metatags={tags} links={links} />

      <Content
        title={episode.title}
        subtitle={episode.subtitle}
        authors={authors}
        body={episode.body}
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
              aspectRatio="uncropped"
              sizes="(max-width: 1100px) 100vw, 1100px"
              alt={episode.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={episode.primaryVisuals?.lead?.longCaption}
        imageCredit={episode.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={episode.primaryVisuals?.lead?.credit?.url}
        publishDate={format(episode.publishDate, 'MMMM D, YYYY')}
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
        name: PropTypes.string,
        href: PropTypes.string
      })
    ),
    body: PropTypes.string,
    contributors: PropTypes.array,
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
