import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { format } from 'date-fns';
import Content from '../../components/Content';
import ContentLayout from '../../layouts/ContentLayout';
import Sidebar from '../../components/Sidebar';
import query from './story.gql';

const Story = ({ slug, previewToken }) => {
  return (
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
        // console.log(data);
        return <StoryInner story={data.story} />;
      }}
    </Query>
  );
};

const StoryInner = ({ story }) => {
  let authors;

  if (story.contributors) {
    authors = story.contributors.map((contributor) => {
      return {
        name: `${contributor.profile?.firstName} ${contributor.profile?.lastName}`,
        href: `/profiles/${contributor.profile?.canonicalSlug}`
      };
    });
  }

  const tag = {
    tagName: story.collections.title,
    to: `/topic/${story.collections.canonicalSlug}`
  };

  return (
    <ContentLayout sidebar={<Sidebar />}>
      <Content
        title={story.title}
        authors={authors}
        body={story.body}
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
        tag={tag}
        elementClass="story"
      />
    </ContentLayout>
  );
};

Story.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

StoryInner.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        href: PropTypes.string
      })
    ),
    body: PropTypes.string,
    image: PropTypes.element,
    imageCaption: PropTypes.string,
    imageCredit: PropTypes.string,
    imageCreditHref: PropTypes.string,
    publishDate: PropTypes.string,
    embeddedAssetJson: PropTypes.string,
    tag: PropTypes.shape({
      tagName: PropTypes.string,
      to: PropTypes.string
    })
  })
};

export default Story;
