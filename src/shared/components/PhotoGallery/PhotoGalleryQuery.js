import gql from 'graphql-tag';

export function photogalleryQuery() {
  return gql`
    {
      episode: episode(
        contentAreaSlug: "live-from-here"
        slug: "2019/04/12/test"
      ) {
        id
        title
        canonicalSlug
        publishDate
        body
        embeddedAssetJson
        primaryVisuals {
          thumbnail {
            aspectRatios {
              normal {
                instances {
                  url
                  width
                  height
                }
              }
              portrait {
                instances {
                  width
                  height
                  url
                }
              }
              widescreen {
                instances {
                  width
                  height
                  url
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
