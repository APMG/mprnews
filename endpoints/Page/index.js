import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from './page.gql';
import Content from '../../components/Content/Content';

const Page = () => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: 'mprnews',
      slug: 'ethics'
    }}
  >
    {({ loading, error, data: { page } }) => {
      if (error) return <div>Error loading page data</div>;
      if (loading) return <div>Loading</div>;

      return <PageInner page={page} />;
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
