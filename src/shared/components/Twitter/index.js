import React, { useContext } from 'react';
import { graphql } from 'react-apollo';
import Twitter from './Twitter';
import PropTypes from 'prop-types';
import { twitterQuery } from './TwitterQuery';
import SiteConfigContext from '../../context/SiteConfigContext';

const TwitterWithData = (props) => {
  const twitterSlug = props['*'];
  const context = useContext(SiteConfigContext);

  const WrappedComponent = graphql(twitterQuery(context.slug, twitterSlug))(
    Twitter
  );
  return <WrappedComponent />;
};

TwitterWithData.propTypes = {
  '*': PropTypes.string
};

export default TwitterWithData;
