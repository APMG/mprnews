import gql from 'graphql-tag';

export function pagePreviewQuery(siteSlug, pageSlug, previewToken) {
  return gql`
    {
      page: page(contentAreaSlug: "${siteSlug}", slug: "${pageSlug}", previewToken: "${previewToken}") {
        id
        title
        canonicalSlug
        publishDate
        body
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
                uncropped {
                  instances {
                    url
                    width
                    height
                  }
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
