import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Link } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { Body } from '@apmg/amat';
import { globals } from '../../config/globals';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Metatags from '../../components/Metatags/Metatags';
import ContributionsContainer from './ContributionsContainer';

const Profile = ({ data: { profile }, pageNum }) => {
  return (
    <>
      <Metatags
        title={profile.title}
        fullSlug={`people/${profile.canonicalSlug}`}
        description={profile.descriptionText}
        image={fishForSocialMediaImage(profile)?.url}
        topic={profile.primaryCollection?.title}
      />

      <section className="page section">
        <div className="content">
          <div className="profile">
            <div className="content_body userContent">
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
                          <Link href={link.uri} key={link.uri} className="link">
                            {link.text}
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
              <ContributionsContainer
                initialCollection={profile.results}
                initialPage={pageNum}
                slug={profile.canonicalSlug}
              />
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
  }),
  pageNum: PropTypes.number
};

export default Profile;
