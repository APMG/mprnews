import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Teaser, Heading } from 'apm-titan';
import { truncateAmat } from '../../utils/utils';
import { Body } from 'amat-react';
import fallback from '../../assets/fallback.png';
import { Image } from 'apm-mimas';

const Collection = (props) => {
  const { data } = props;

  if (!data || data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;
  return (
    <section className="collection section">
      <Heading level={2}>{data.collection.title}</Heading>

      {data.collection.results.items.map((collection) => {
        return (
          <Teaser
            key={collection.id}
            id={collection.id}
            title={collection.title}
            href={`/story/${collection.canonicalSlug}`}
            publishDate={collection.publishDate}
            headingLevel={2}
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
            description=<Body
              nodeData={truncateAmat(JSON.parse(collection.description))}
            />
          />
        );
      })}
    </section>
  );
};

Collection.propTypes = {
  data: PropTypes.object
};

export default Collection;
