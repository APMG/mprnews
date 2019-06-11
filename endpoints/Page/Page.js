import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Heading, Loading } from '@apmg/titan';
import { Body } from 'amat-react';
import query from './page.gql';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';

const Page = ({ slug, previewToken }) => (
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

      return <PageInner page={data.page} />;
    }}
  </Query>
);

const PageInner = ({ page }) => {
  const socialImage = fishForSocialMediaImage(page);
  const tags = [
    { key: 'description', name: 'description', content: page.descriptionText },
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
      <Metatags title={page.title} metatags={tags} links={[]} />
      <section className="page section">
        <div className="content">
          <div className="content_date">
            {format(page.publishDate, 'MMMM D, YYYY')}
          </div>
          <Heading level={2} elementClass="hdg-page">
            {page.title}
          </Heading>
          <div className="content_body">
            <Body
              nodeData={JSON.parse(page.body)}
              embedded={JSON.parse(page.embeddedAssetJson)}
            />
          </div>
        </div>
      </section>
    </>
  );
};

Page.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

PageInner.propTypes = {
  page: PropTypes.object
};

export default Page;
