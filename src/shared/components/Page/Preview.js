import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Page from './Page';
import { pagePreviewQuery } from './PagePreviewQuery';
import PropTypes from 'prop-types';
import SiteConfigContext from '../../context/SiteConfigContext';

const PagePreviewWithData = (props) => {
  const context = useContext(SiteConfigContext);
  const ClientAndServerLocation = props.location.pathname.match(/\?/g)
    ? props.location.pathname
    : window.location.pathname + window.location.search;
  const [curPath, qs] = ClientAndServerLocation.split('?');
  const token = new URLSearchParams(qs).get('token');
  const pageSlug = curPath.replace(/\/preview\/pages\//, '');
  const WrappedComponent = graphql(
    pagePreviewQuery(context.slug, pageSlug, token)
  )(Page);

  return <WrappedComponent />;
};

PagePreviewWithData.propTypes = {
  location: PropTypes.object
};

export default PagePreviewWithData;
