import gql from 'graphql-tag';

export function homeQuery(siteSlug, homeSlug) {
  return gql`
    {
      homeList: collection(contentAreaSlug: "${siteSlug}", slug: "${homeSlug}") {
        title
        description
        results(page: 1, pageSize: 4) {
          items {
            id
            title
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
            canonicalSlug
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
