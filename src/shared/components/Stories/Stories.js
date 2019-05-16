import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Teaser, Heading } from 'apm-titan';
import { Image } from 'apm-mimas';
import { Body } from 'amat-react';
import { truncateAmat } from '../../utils/utils';
import fallback from '../../assets/fallback.png';

const Stories = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <section className="stories section">
      <Heading level={2}>Collection of Stories</Heading>
      {data.storiesList.results.items.map((story) => {
        return (
          <Teaser
            key={story.id}
            id={story.id}
            title={story.title}
            href={`/story/${story.canonicalSlug}`}
            publishDate={story.publishDate}
            headingLevel={3}
            image={
              story.primaryVisuals?.thumbnail ? (
                <Image
                  image={story.primaryVisuals.thumbnail}
                  aspectRatio="widescreen"
                  sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                  alt={story.primaryVisuals.thumbnail.longCaption}
                />
              ) : (
                <Image fallbackSrc={fallback} alt="Fallback image" />
              )
            }
            description=<Body
              nodeData={truncateAmat(JSON.parse(story.description))}
            />
          />
        );
      })}
    </section>
  );
};

Stories.propTypes = {
  data: PropTypes.object
};

export default Stories;
