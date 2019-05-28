import gql from 'graphql-tag';

export function episodeQuery(siteSlug, episodeSlug) {
  return gql`
    {
      episode: episode(contentAreaSlug: "${siteSlug}", slug: "${episodeSlug}") {
        id
        title
        canonicalSlug
        publishDate
        body
        embeddedAssetJson
        primaryVisuals {
          lead {
            aspect_ratios: aspectRatios {
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
