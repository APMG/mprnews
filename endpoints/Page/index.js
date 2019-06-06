import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './page.gql';
import Content from '../../components/Content';

const Page = ({ slug }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug
    }}
  >
    {({ loading, error, data }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <PageInner page={data.page} />;
    }}
  </Query>
);

const PageInner = ({ page }) => {
  return (
    <article className="story">
      <Content
        title={page.title}
        body={page.body}
        embeddedAssetJson={page.embeddedAssetJson}
      />
    </article>
  );
};

Page.propTypes = {
  slug: PropTypes.any
};

PageInner.propTypes = {
  page: PropTypes.object
};

export default Page;
