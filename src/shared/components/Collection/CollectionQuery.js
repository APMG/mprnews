import gql from 'graphql-tag';

export function collectionQuery(contextSlug, pageNum, topicSlug) {
  return gql`
    {
      collectionList: collectionList(contentAreaSlug: "${contextSlug}") {
        id
        title
        results(page: ${pageNum}, pageSize: 10) {
          nextPage
          pageSize
          totalPages
          totalItems
          previousPage
          currentPage
          items {
            id
            title
            canonicalSlug
          }
          totalItems
          nextPage
        }
      }
      collection: collection(contentAreaSlug: "news-taxonomy-test", slug: "topic/${topicSlug}") { 
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
