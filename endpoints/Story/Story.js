import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { collectionLinkData } from '../../utils/utils';
import { format } from 'date-fns';
import Content from '../../components/Content/Content';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import ContentGrid from '../../grids/ContentGrid';
import Sidebar from '../../components/Sidebar/Sidebar';
import query from './story.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const Story = ({ slug, previewToken }) => (
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
      console.log(data.story.dateline);

      return <StoryInner story={data.story} />;
    }}
  </Query>
);

const StoryInner = ({ story }) => {
  let authors;

  if (story.contributors) {
    authors = story.contributors.map((contributor) => {
      return {
        name: `${contributor.profile.title}`,
        href: `/people/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  const socialImage = fishForSocialMediaImage(story);
  const tags = [
    { key: 'description', name: 'description', content: story.descriptionText },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];

  return (
    <ContentGrid sidebar={<Sidebar />}>
      <Metatags title={story.title} metatags={tags} links={[]} />
      <Content
        title={story.title}
        subtitle={story.subtitle}
        dateline={story.dateline}
        authors={authors}
        body={story.body}
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
    </ContentGrid>
  );
};

Story.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

StoryInner.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    dateline: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
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
  })
};

export default Story;
