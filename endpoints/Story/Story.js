import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './story.gql';
import { Loading, Time } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { collectionLinkData } from '../../utils/utils';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import { globals } from '../../config/globals';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';
import Content from '../../components/Content/Content';
import Metatags from '../../components/Metatags/Metatags';
import ShareSocialButtons from '../../components/ShareSocialButtons/ShareSocialButtons';

const Story = ({ slug, previewToken, minimal }) => (
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

      if (data.story === null) return <Error statusCode={404} />;

      return <StoryInner story={data.story} minimal={minimal} />;
    }}
  </Query>
);

const StoryInner = ({ story, minimal }) => {
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

  const socialImage = fishForSocialMediaImage(story);
  const tags = [
    {
      key: 'description',
      name: 'description',
      content: story?.descriptionText
    },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'mpr-content-topic',
      name: 'mpr-content-topic',
      content: story?.primaryCollection?.title
    },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];
  const links =
    story.supportedOutputFormats.indexOf('amp') === -1
      ? []
      : [
          {
            key: 'amphtml',
            rel: 'amphtml',
            href: `https://www.mprnews.org/amp/story/${story?.canonicalSlug}`
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
        shareButtons={
          !minimal && (
            <ShareSocialButtons
              contentUrl={story.canonicalSlug}
              title={story.title}
            />
          )
        }
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
  }),
  minimal: PropTypes.bool
};

export default Story;
