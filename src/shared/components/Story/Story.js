import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'apm-titan';
import { Image } from 'apm-mimas';
import { format } from 'date-fns';
import Content from '../Content/Content';

const Story = (props) => {
  const { data } = props;
  const { story } = data;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;

  const authors = story.contributors.map((contributor) => {
    return {
      name: `${contributor.profile?.firstName} ${
        contributor.profile?.lastName
      }`,
      href: `/profiles/${contributor.profile?.canonicalSlug}`
    };
  });

  const tag = () => {
    return {
      tagName: story.collections[0].title,
      to: `/topic/${story.collections[0].canonicalSlug}`
    };
  };

  return (
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
      tag={tag()}
      elementClass="story"
    />
  );
};

Story.propTypes = {
  data: PropTypes.object
};

export default Story;
