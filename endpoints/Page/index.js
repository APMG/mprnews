import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './page.gql';
import Content from '../../components/Content';

const Page = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: 'ethics'
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

PageInner.propTypes = {
  page: PropTypes.object
};

export default Page;
