import gql from 'graphql-tag';

export function StoryPreviewQuery(siteSlug, storySlug, previewToken) {
  return gql`
    {
      story: story(contentAreaSlug: "${siteSlug}", slug: "${storySlug}", previewToken: "${previewToken}") {
        id
        title
        canonicalSlug
        publishDate
        body
        description
        embeddedAssetJson
        primaryVisuals {
          lead {
            aspect_Ratios: aspectRatios {
              square {
                instances {
                  url
                  width
                  height
                }
              }
              uncropped {
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
