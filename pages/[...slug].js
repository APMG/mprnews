import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import initApollo from '../lib/init-apollo';
import query from '../endpoints/Collection/variable.gql';
import collectionQuery from '../endpoints/Collection/collection.gql';
import pageQuery from '../endpoints/Page/page.gql';
import Page from '../endpoints/Page/Page';
import Collection from '../endpoints/Collection/Collection';
import ContentGrid from '../grids/ContentGrid';
import Sidebar from '../components/Sidebar/Sidebar';
import { isNumeric } from '../utils/utils';

const VariableComponent = (obj) => {
  const { data, slug, type, pageNum } = obj;
  if (obj.errorCode) return <ErrorPage statusCode={obj.errorCode} />;
  if (type === 'collection') {
    return (
      <ContentGrid sidebar={<Sidebar />}>
        <Collection data={data} slug={slug} pageNum={pageNum} />
      </ContentGrid>
    );
  }
  if (type === 'page') {
    return (
      <ContentGrid sidebar={<Sidebar />}>
        <Page data={data} />
      </ContentGrid>
    );
  }
};

VariableComponent.getInitialProps = async ({ query: { slug }, res }) => {
  const ApolloClient = initApollo();
  let data;
  let type;
  let errorCode;
  let pageNum = 1;

  if (isNumeric(slug[slug.length - 1])) {
    pageNum = parseInt(slug.pop());
  }

  const getCollectionData = async () => {
    let data;
    await ApolloClient.query({
      query: collectionQuery,
      variables: {
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: slug.join('/'),
        pageNum: pageNum
      }
    })
      .then((result) => {
        data = result.data;
      })
      .catch((err) => {
        console.error(err);
      });

    return data;
  };

  const getPageData = async () => {
    let data;
    await ApolloClient.query({
      query: pageQuery,
      variables: {
        contentAreaSlug: process.env.CONTENT_AREA_SLUG,
        slug: slug.join('/')
      }
    })
      .then((result) => {
        data = result.data;
      })
      .catch((err) => {
        console.error(err);
      });

    return data;
  };

  await ApolloClient.query({
    query: query,
    variables: {
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug.join('/')
    }
  })
    .then(async (result) => {
      if (res) {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
      if (!result.data.content) {
        res.statusCode = 404;
        errorCode = res.statusCode > 200 ? res.statusCode : false;
        return;
      }
      type = result.data.content.resourceType;
      if (type === 'collection') {
        data = await getCollectionData();
      }
      if (type === 'page') {
        data = await getPageData();
      }
    })
    .catch((err) => {
      console.error(err);
      res.statusCode = 500;
      errorCode = res.statusCode > 200 ? res.statusCode : false;
    });

  return {
    data,
    type,
    pageNum,
    errorCode
  };
};

VariableComponent.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  data: PropTypes.object,
  slug: PropTypes.array
};

export default VariableComponent;
