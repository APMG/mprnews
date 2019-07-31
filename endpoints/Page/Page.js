import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'next/error';
import { Query } from 'react-apollo';
import QueryError from '../../components/QueryError/QueryError';
import query from './page.gql';
import { Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { globals } from '../../config/globals';
import { collectionLinkData } from '../../utils/utils';
import Content from '../../components/Content/Content';
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
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (error) return <QueryError error={error.message} />;
      if (loading) return <Loading />;

      if (data.page === null) return <ErrorPage statusCode={404} />;

      return <PageInner page={data.page} />;
    }}
  </Query>
);

const PageInner = ({ page }) => {
  return (
    <>
      <Metatags
        title={page.title}
        fullSlug={`episode/${page.canonicalSlug}`}
        description={page.descriptionText}
        image={fishForSocialMediaImage(page)}
        isAmp={page.supportedOutputFormats?.indexOf('amp') > -1}
        topic={page.primaryCollection?.title}
        contentType="article"
      />

      <Content
        title={page.title}
        subtitle={page.subtitle}
        body={page.body}
        image={
          page.primaryVisuals?.lead && (
            <Image
              key={page.primaryVisuals.lead.fallback}
              image={page.primaryVisuals.lead}
              aspectRatio="uncropped"
              sizes={globals.sizes.primaryVisuals}
              alt={page.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={page.primaryVisuals?.lead?.longCaption}
        imageCredit={page.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={page.primaryVisuals?.lead?.credit?.url}
        embeddedAssetJson={page.embeddedAssetJson}
        tag={collectionLinkData(page.primaryCollection)}
        elementClass="page"
      />
    </>
  );
};

Page.propTypes = {
  slug: PropTypes.string,
  previewToken: PropTypes.string
};

PageInner.propTypes = {
  page: PropTypes.shape({
    canonicalSlug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    body: PropTypes.string,
    descriptionText: PropTypes.string,
    supportedOutputFormats: PropTypes.array,
    image: PropTypes.element,
    imageCaption: PropTypes.string,
    imageCredit: PropTypes.string,
    imageCreditHref: PropTypes.string,
    primaryVisuals: PropTypes.any,
    primaryCollection: PropTypes.any,
    publishDate: PropTypes.string,
    embeddedAssetJson: PropTypes.string,
    tag: PropTypes.shape({
      tagName: PropTypes.string,
      to: PropTypes.string
    })
  })
};

export default Page;
