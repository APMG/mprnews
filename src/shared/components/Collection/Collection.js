import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Teaser } from 'apm-titan';
import { truncateAmat } from '../../utils/utils';
import { Body } from 'amat-react';
import fallback from '../../assets/fallback.png';
import { Image } from 'apm-mimas';

const Collection = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <div>
      <h1>{data.collection.title}</h1>

      {data.collection.results.items.map((collection) => {
        return (
          <Teaser
            key={collection.id}
            id={collection.id}
            title={collection.title}
            href={`/story/${collection.canonicalSlug}`}
            publishDate={collection.publishDate}
            headingLevel={2}
            description=<Body
              nodeData={truncateAmat(JSON.parse(collection.description))}
            />
            image={
              collection.primaryVisuals?.lead ? (
                <Image
                  image={collection.primaryVisuals.lead}
                  aspectRatio="uncropped"
                  sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                  alt={collection.primaryVisuals.lead.longCaption}
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
Collection.propTypes = {
  data: PropTypes.object
};
export default Collection;
