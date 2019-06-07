import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Heading, Loading } from '@apmg/titan';
import { Body } from 'amat-react';
import query from './page.gql';

const Page = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
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
  return (
    <>
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
  slug: PropTypes.string
};

PageInner.propTypes = {
  page: PropTypes.object
};

export default Page;
