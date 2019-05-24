import gql from 'graphql-tag';

export function StoriesQuery(contextSlug, pageNum) {
  return gql`
    {
      storiesList: collection(contentAreaSlug: "${contextSlug}", slug: "press/mpr-news" ) {
        id
        title
        results(page: ${pageNum}, pageSize: 18) {
          nextPage
          pageSize
          totalPages
          totalItems
          previousPage
          currentPage
          items {
            id
            title
            publishDate
            description
            canonicalSlug
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
          }
          totalItems
          nextPage
        }
      }
    }
  `;
}
