import gql from 'graphql-tag';

export function twitterQuery(siteSlug, twitterSlug) {
  return gql`
    {
      twitter: story(contentAreaSlug: "${siteSlug}", slug: "${twitterSlug}") {
        id
        title
        canonicalSlug
        resourceType
        audio {
          title
          durationHms
          encodings {
            httpFilePath
          }
        }
      }
    }
  `;
}
