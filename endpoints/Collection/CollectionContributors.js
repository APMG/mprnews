import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@apmg/mimas';
import { Heading } from '@apmg/titan';
import Link from 'next/link';

const CollectionContributors = (props) => {
  return (
    <div className="section section-sm">
      <div className="collection_sidebarHeader">
        <Heading level={3} className="hdg hdg-section hdg-section-small">
          Contributors
        </Heading>
      </div>
      <div className="collection_sidebarBody">
        {props.contributors.map((contrib, index) => {
          return (
            <div key={index} className="miniBio">
              {contrib.profile.primaryVisuals.thumbnail && (
                <Link href={`/people/${contrib.profile.canonicalSlug}`}>
                  <a className="miniBio_img">
                    <Image
                      image={contrib.profile.primaryVisuals.thumbnail}
                      aspectRatio="square"
                      alt={
                        contrib.profile.primaryVisuals.thumbnail.shortCaption
                      }
                      sizes="50px"
                    />
                  </a>
                </Link>
              )}
              <div className="miniBio_info">
                <Link href={`/people/${contrib.profile.canonicalSlug}`}>
                  <a className="miniBio_name">
                    {contrib.profile.firstName} {contrib.profile.lastName}
                  </a>
                </Link>
                {contrib.profile.profileRelatedLinks.length ? (
                  <>
                    {contrib.profile.profileRelatedLinks.map((link) => (
                      <Link href={link.uri} key={link.uri}>
                        <a className="miniBio_social">{link.text}</a>
                      </Link>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CollectionContributors.propTypes = {
  contributors: PropTypes.array
};

export default CollectionContributors;