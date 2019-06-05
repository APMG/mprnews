import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Page from './Page';
import { pageQuery } from './PageQuery';
import SiteConfigContext from '../../context/SiteConfigContext';
import PropTypes from 'prop-types';

const PageWithData = (props) => {
  const context = useContext(SiteConfigContext);
  let pageSlug;
  if (props['*']) {
    // /pages/:slug  urls
    pageSlug = props['*'];
  } else {
    // allow for /about url
    const path = props.path;
    const arr = path.split('/');
    pageSlug = arr[arr.length - 1];
  }

  const WrappedComponent = graphql(pageQuery(context.slug, pageSlug))(Page);

  return <WrappedComponent />;
};

PageWithData.propTypes = {
  '*': PropTypes.string,
  path: PropTypes.string
};

export default PageWithData;
