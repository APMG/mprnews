import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Teaser } from 'apm-titan';
import { Image } from 'apm-mimas';
import { Body } from 'amat-react';
import { truncateAmat } from '../../utils/utils';
import fallback from '../../assets/fallback.png';

const Stories = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <h1>Stories</h1>
      {data.storiesList.results.items.map((story) => {
        return (
          <Teaser
            key={story.id}
            id={story.id}
            title={story.title}
            href={`/story/${story.canonicalSlug}`}
            publishDate={story.publishDate}
            headingLevel={2}
            description=<Body
              nodeData={truncateAmat(JSON.parse(story.description))}
            />
            image={
              story.primaryVisuals?.thumbnail ? (
                <Image
                  image={story.primaryVisuals.thumbnail}
                  aspectRatio="widescreen"
                  sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                  alt={story.primaryVisuals.thumbnail.longCaption}
                />
              ) : (
                <Image fallbackSrc={fallback} alt="" />
              )
            }
          />
        );
      })}
    </div>
  );
};
Stories.propTypes = {
  data: PropTypes.object
};
export default Stories;
