import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import { Image } from 'apm-mimas';
import { Body } from '@apmg/amat';
import query from './profile.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import Link from 'next/link';
import { linkByTypeAs } from '../../utils/cjsutils';
const Profile = ({ slug, previewToken }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>{`Error: ${error}`}</div>;
      if (loading) return <Loading />;

      return <ProfileInner profile={data.profile} />;
    }}
  </Query>
);

const ProfileInner = ({ profile }) => {
  const socialImage = fishForSocialMediaImage(profile);
  const tags = [
    {
      key: 'description',
      name: 'description',
      content: profile?.descriptionText
    },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];
  return (
    <>
      <Metatags title={profile?.title} metatags={tags} links={[]} />
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
                      sizes="(max-width: 1100px) 100vw, 1100px"
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
                    profile.contributions &&
                    profile.contributions.map((contribution) => {
                      const linkAs = linkByTypeAs(contribution);
                      return (
                        <li key={contribution.id}>
                          {console.log(contribution)}
                          <Link
                            href={`/${contribution.resourceType}/${contribution.canonicalSlug}`}
                            as={linkAs}
                          >
                            <a className="contributer">
                              {contribution.title}
                              <div>{contribution.descriptionText}</div>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Profile.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

ProfileInner.propTypes = {
  profile: PropTypes.object
};

export default Profile;
