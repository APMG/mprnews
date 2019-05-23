import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Stories from './Stories';
import { StoriesQuery } from './StoriesQuery';
import SiteConfigContext from '../../context/SiteConfigContext';
import PropTypes from 'prop-types';

const StoriesWithData = (props) => {
  const context = useContext(SiteConfigContext);
  const pageNum = props.id ? props.id : 1;
  // slug: news-taxonomy-test, currently only has a collections of section titles, but no data to fetch yet.
  // temporarily fetching data from mpr: /press/mpr-news instead.
  const WrappedComponent = graphql(StoriesQuery(context.slug, pageNum), {
    options: () => ({
      variables: {
        page: pageNum
      }
    })
  })(Stories);

  return <WrappedComponent />;
};

StoriesWithData.propTypes = {
  id: PropTypes.string
};

export default StoriesWithData;
