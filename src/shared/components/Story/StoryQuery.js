import gql from 'graphql-tag';

export function storyQuery(siteSlug, storySlug) {
  return gql`
    {
      story: story(contentAreaSlug: "${siteSlug}", slug: "${storySlug}") {
        id
        title
        canonicalSlug
        publishDate
        body
        description
        resourceType
        embeddedAssetJson
        primaryVisuals {
          lead {
            aspectRatios {
              square {
                instances {
                  url
                  width
                  height
                }
              }
            }
            contentArea
            dateTaken
            dateline
            fallback
            longCaption
            shortCaption
            xid
          }
        }
      }
    }
  `;
}
