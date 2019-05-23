import gql from 'graphql-tag';

export function homeQuery(siteSlug) {
  return gql`
    {
      homeList: collection(contentAreaSlug: "${siteSlug}", slug: "homepage") {
        id
        title
        description
        results(page: 1, pageSize: 4) {
          items {
            id
            title
            canonicalSlug
            resourceType
            publishDate
            description
            primaryVisuals {
              thumbnail {
                aspect_ratios: aspectRatios {
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
            audio {
              title
              durationHms
              encodings {
                httpFilePath
              }
            }
            ... on Link {
              destination
            }
          }
        }
      }
    }
  `;
}
