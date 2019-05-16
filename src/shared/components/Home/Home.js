import React from 'react';
import PropTypes from 'prop-types';
import { Loading, Teaser } from 'apm-titan';
import { Image } from 'apm-mimas';
import PhotoGalleryWithData from '../PhotoGallery';
import CollectionLinks from '../Collection/CollectionLink';
import { truncateAmat } from '../../utils/utils';
import { Body } from 'amat-react';
import fallback from '../../assets/fallback.png';

const Home = (props) => {
  const { data } = props;

  if (data.loading) return <Loading />;
  if (data.error) return <div>Error</div>;

  return (
    <>
      {data.homeList.results.items.map((home) => {
        const link =
          data.resourceType === 'link'
            ? home.destination
            : `/story/${home.canonicalSlug}`;

        return (
          <Teaser
            key={home.id}
            id={home.id}
            title={home.title}
            href={link}
            publishDate={home.publishDate}
            headingLevel={2}
            image={
              home?.primaryVisuals?.thumbnail ? (
                <Image
                  image={home?.primaryVisuals?.thumbnail}
                  elementClass="content_thumbnail"
                  aspectRatio="widescreen"
                  sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 300px"
                  alt={home?.primaryVisuals?.thumbnail?.shortCaption}
                />
              ) : (
                <Image
                  elementClass="content_thumbnail"
                  fallbackSrc={fallback}
                  alt={home?.title || ''}
                />
              )
            }
            description=<Body
              nodeData={truncateAmat(JSON.parse(home.description))}
            />
          />
        );
      })}
      <CollectionLinks />
      <PhotoGalleryWithData />
    </>
  );
};

Home.propTypes = {
  data: PropTypes.object
};

export default Home;
