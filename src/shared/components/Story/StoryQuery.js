import gql from 'graphql-tag';

export function storyQuery(siteSlug, storySlug) {
  return gql`
    {
      story: story(contentAreaSlug: "${siteSlug}", slug: "${storySlug}") {
        id
        title
        canonicalSlug
        collections {
          title
          canonicalSlug
        }
        contributors {
          profile {
            firstName
            lastName
            canonicalSlug

          }
          roles {
            name
          }
        }
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
            credit {
              name
              url
            }
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
