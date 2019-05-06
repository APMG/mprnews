import gql from 'graphql-tag';

export function PageQuery(siteSlug, pageSlug) {
  return gql`
    {
      page: page(contentAreaSlug: "${siteSlug}", slug: "${pageSlug}") {
        id
        title
        canonicalSlug
        publishDate
        body
        embeddedAssetJson
      }
    }
  `;
}
