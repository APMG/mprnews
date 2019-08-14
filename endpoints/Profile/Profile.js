import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading, Pagination } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { Body } from '@apmg/amat';
import { globals } from '../../config/globals';
import { linkByTypeHref, linkByTypeAs } from '../../utils/cjsutils';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Metatags from '../../components/Metatags/Metatags';
import Icon from '../../components/Icons/Icon';

const Profile = ({ data: { profile } }) => {
  return (
    <>
      <Metatags
        title={profile.title}
        fullSlug={`people/${profile.canonicalSlug}`}
        description={profile.descriptionText}
        image={fishForSocialMediaImage(profile)}
        topic={profile.primaryCollection?.title}
      />

      <section className="page section">
        <div className="content">
          <div className="content_body userContent">
            <div className="profile">
              <div className="profile_header">
                {profile?.primaryVisuals?.lead && (
                  <div className="profile_image">
                    <Image
                      key={profile?.primaryVisuals.lead.fallback}
                      image={profile?.primaryVisuals.lead}
                      aspectRatio="uncropped"
                      sizes={globals.sizes.primaryVisuals}
                      alt={profile?.primaryVisuals.lead.shortCaption}
                    />
                  </div>
                )}

                <div className="profile_information">
                  <Heading level={2} elementClass="hdg-profile">
                    {profile?.title}
                  </Heading>
                  <Heading level={3} elementClass="hdg-profile">
                    {profile?.jobTitle}
                  </Heading>

                  <div className="profile_email">{profile?.email}</div>
                  <div className="profile_relatedLinks">
                    {profile &&
                      profile.profileRelatedLinks &&
                      profile.profileRelatedLinks.map((link) => {
                        return (
                          <Link href={link.uri} key={link.uri}>
                            <a className="link">{link.text}</a>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="profile_body">
                {profile && profile.body && (
                  <Body
                    nodeData={JSON.parse(profile?.body)}
                    embedded={JSON.parse(profile?.embeddedAssetJson)}
                  />
                )}
              </div>
              <div className="profile_footer">
                <h3>Recent Contributions</h3>
                <ul>
                  {profile &&
                    profile.results &&
                    profile.results.items.map((contribution) => {
                      const linkHref = linkByTypeHref(contribution);
                      const linkAs = linkByTypeAs(contribution);
                      return (
                        <li key={contribution.id}>
                          <Link href={linkHref} as={linkAs}>
                            <a className="contributer">
                              {contribution.title}
                              {contribution.descriptionText && (
                                <div>{contribution.descriptionText}</div>
                              )}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="profile_pagination">
                <Pagination
                  hasFirstAndLast={true}
                  inclusiveFirstLast={true}
                  buffer={1}
                  hrefPrefix={`profile?slug=people/${profile.canonicalSlug}`}
                  asPrefix={`people/${profile.canonicalSlug}`}
                  currentPage={profile.results.currentPage}
                  totalPages={profile.results.totalPages}
                  firstLastSeparator="..."
                  firstSymbol="1"
                  nextSymbol={
                    <>
                      <span>Next</span>
                      <Icon name="chevronRight" />
                    </>
                  }
                  prevSymbol={
                    <>
                      <Icon name="chevronLeft" />
                      <span>Prev</span>
                    </>
                  }
                  lastSymbol={profile.results.totalPages}
                  prevNextClass="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Profile.propTypes = {
  data: PropTypes.shape({
    profile: PropTypes.object
  })
};

export default Profile;
