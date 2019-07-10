import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Loading } from '@apmg/titan';
import { Image } from '@apmg/mimas';
import { collectionLinkData } from '../../utils/utils';
import Content from '../../components/Content/Content';
import Metatags from '../../components/Metatags/Metatags';
import { fishForSocialMediaImage } from '../../components/Metatags/MetaTagHelpers';
import query from './page.gql';

const Page = ({ slug, previewToken }) => (
  <Query
    query={query}
    variables={{
      contentAreaSlug: process.env.CONTENT_AREA_SLUG,
      slug: slug,
      previewToken: previewToken
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
  const socialImage = fishForSocialMediaImage(page);
  const tags = [
    { key: 'description', name: 'description', content: page.descriptionText },
    { key: 'og:image', name: 'og:image', content: socialImage },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { key: 'twitter:image', name: 'twitter:image', content: socialImage }
  ];
  const links = [
    {
      key: 'amphtml',
      rel: 'amphtml',
      href: `https://www.mprnews.org/amp/page/${page.canonicalSlug}`
    }
  ];

  return (
    <>
      <Metatags title={page.title} metatags={tags} links={links} />

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
              sizes="(max-width: 1100px) 100vw, 1100px"
              alt={page.primaryVisuals.lead.shortCaption}
            />
          )
        }
        imageCaption={page.primaryVisuals?.lead?.longCaption}
        imageCredit={page.primaryVisuals?.lead?.credit?.name}
        imageCreditHref={page.primaryVisuals?.lead?.credit?.url}
        embeddedAssetJson={page.embeddedAssetJson}
        tag={collectionLinkData(page.primaryCollection)}
        elementClass="episode"
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
