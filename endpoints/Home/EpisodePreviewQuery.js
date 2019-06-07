import gql from 'graphql-tag';

export function episodePreviewQuery(siteSlug, episodeSlug, previewToken) {
  const qry = `{
    episode: episode(contentAreaSlug: "${siteSlug}", slug: "${episodeSlug}", previewToken: "${previewToken}") {
        id
        title
        canonicalSlug
        publishDate
        body
        embeddedAssetJson
        primaryVisuals {
          lead {
            aspectRatios: aspectRatios {
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
    }`;
  return gql(qry);
}
