import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Heading, Loading } from '@apmg/titan';
import { Body } from 'amat-react';
import query from './profile.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

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
      content: profile.descriptionText
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
      <Metatags title={profile.title} metatags={tags} links={[]} />
      <section className="page section">
        <div className="content">
          <Heading level={2} elementClass="hdg-page">
            {profile.title}
          </Heading>
          <div className="content_body">
            <Body
              nodeData={JSON.parse(profile.body)}
              embedded={JSON.parse(profile.embeddedAssetJson)}
            />
          </div>
        </div>
      </section>
      <section className="page section">
        <h3>Contributions</h3>
        {profile.contributions.map((contribution) => {
          return (
            <article key={contribution.id}>
              <h4>{contribution.title}</h4>
              <div>{contribution.descriptionText}</div>
            </article>
          );
        })}
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
