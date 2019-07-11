import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { collectionLinkData } from '../../utils/utils';
import { format } from 'date-fns';
import Content from '../../components/Content/Content';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import query from './story.gql';

const Story = ({ slug, previewToken, minimal }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading story</div>;
      if (loading) return <Loading />;

      return <StoryInner story={data.story} minimal={minimal} />;
    }}
  </Query>
);

const StoryInner = ({ story, minimal }) => {
  let authors;
  if (story.contributors) {
    authors = story.contributors.map((contributor) => {
      return {
        title: `${contributor.profile.title}`,
        href: `/people/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  const socialImage = fishForSocialMediaImage(story);
  const tags = [
    { key: 'description', name: 'description', content: story.descriptionText },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'mpr-content-topic',
      name: 'mpr-content-topic',
      content: collectionLinkData(story.primaryCollection)
    },
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
      href: `https://www.mprnews.org/amp/story/${story.canonicalSlug}`
    }
  ];

  return (
    <>
      <Metatags title={story.title} metatags={tags} links={links} />
      <Content
        title={story.title}
        subtitle={story.subtitle}
        dateline={story.dateline}
        authors={authors}
        body={story.body}
        minimal={minimal}
        redistributable={story.primaryVisuals?.lead?.rights?.redistributable}
        audioPlayButton={
          story.primaryAudio && (
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
              aspectRatio="uncropped"
              sizes="(max-width: 1100px) 100vw, 1100px"
              alt={story.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={story.primaryVisuals?.lead?.longCaption}
        imageCredit={story.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={story.primaryVisuals?.lead?.credit?.url}
        publishDate={format(story.publishDate, 'MMMM D, YYYY')}
        embeddedAssetJson={story.embeddedAssetJson}
        tag={collectionLinkData(story.primaryCollection)}
        elementClass="story"
      />
    </>
  );
};

Story.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string,
  minimal: PropTypes.bool
};

StoryInner.propTypes = {
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
    contributors: PropTypes.array,
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
  }),
  minimal: PropTypes.bool
};

export default Story;
