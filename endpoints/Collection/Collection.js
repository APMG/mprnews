import React from 'react';
import Router from 'next/router';
import { Teaser, Heading, Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { Body } from '@apmg/amat';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './collection.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import CollectionContributors from './CollectionContributors';
import Pagination from '../../components/Pagination/Pagination';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import { secondsToHms } from '../../utils/utils';
import AudioPlayButton from '../../components/AudioPlayButton/AudioPlayButton';

const Collection = ({ collectionName, pageNum }) => {
  return (
    <Query
      query={query}
      variables={{
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: collectionName,
        pageNum: pageNum
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <div>{`Error: ${error}`}</div>;
        if (loading) return <Loading />;

        return (
          <CollectionInner
            collectionName={collectionName}
            collection={data.collection}
            pageNum={parseInt(pageNum)}
          />
        );
      }}
    </Query>
  );
};

const CollectionInner = ({ collection, pageNum, collectionName }) => {
  const socialImage = fishForSocialMediaImage(collection);
  const tags = [
    {
      key: 'description',
      name: 'description',
      content: collection.descriptionText
    },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];

  const contributors = (contributorsArr) => {
    if (contributorsArr.length) {
      return contributorsArr.map((contributor) => {
        return `${
          contributor.profile?.firstName ? contributor.profile.firstName : ''
        } ${contributor.profile?.lastName ? contributor.profile.lastName : ''}`;
      });
    } else {
      return null;
    }
  };

  return (
    <>
      <Metatags title={collection.title} metatags={tags} links={[]} />

      <section className="collection">
        <div className="collection_header">
          <Heading level={1} className="hdg hdg-section">
            {collection.title}
          </Heading>
        </div>
        {collection.body && (
          <div className="collection_body userContent">
            <Body
              nodeData={JSON.parse(collection.body)}
              embedded={JSON.parse(collection.embeddedAssetJson)}
            />
          </div>
        )}
        <aside className="collection_sidebar">
          {collection.contributors?.length ? (
            <CollectionContributors contributors={collection.contributors} />
          ) : null}
        </aside>
        <div className="collection_items">
          {collection.results.items.map((item) => {
            let link = linkByTypeHref(item);
            let linkAs = linkByTypeAs(item);
            if (collection.canonicalSlug === 'newspartners') {
              link = link.replace(/story/, 'newspartnerstory');
              linkAs = linkAs.replace(/story/, 'newspartnerstory');
            }

            return (
              <Teaser
                key={item.id}
                id={item.id}
                title={item.title}
                contributors={contributors(item.contributors)}
                href={link}
                as={linkAs}
                router={Router}
                publishDate={item.publishDate}
                headingLevel={2}
                image={
                  item.primaryVisuals?.thumbnail ? (
                    <Image
                      image={item.primaryVisuals.thumbnail}
                      aspectRatio="widescreen"
                      sizes="(max-width: 590px) 95vw, (max-width: 890px) 45vw, 500px"
                      alt={item.primaryVisuals.thumbnail.shortCaption}
                    />
                  ) : null
                }
                audioPlayButton={
                  item.audio[0]?.encodings[0]?.httpFilePath ? (
                    <AudioPlayButton
                      audioSource={item.audio[0].encodings[0].httpFilePath}
                      audioTitle={item.title}
                      label={secondsToHms(
                        item.audio[0].encodings[0].durationMs / 1000
                      )}
                    />
                  ) : null
                }
                description=<Body nodeData={JSON.parse(item.description)} />
              />
            );
          })}
        </div>
        <div className="collection_pagination">
          <Pagination
            collection={collection}
            collectionName={collectionName}
            pageNum={pageNum}
          />
        </div>
      </section>
    </>
  );
};

CollectionInner.propTypes = {
  collection: PropTypes.object,
  collectionName: PropTypes.string,
  pageNum: PropTypes.number
};

Collection.propTypes = {
  collectionName: PropTypes.string,
  pageNum: PropTypes.number
};

export default Collection;
