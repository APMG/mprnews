import { gql } from 'apollo-boost';
const collectionQuery = (slug, pageNum) => {
  const q = `
 {
  collection: collection(contentAreaSlug: "${
    process.env.CONTENT_AREA_SLUG
  }", slug: "${slug}") {
    id
    title
    body
    descriptionText
    primaryVisuals {
      social {
        fallback
      }
    }
    embeddedAssetJson
    canonicalSlug
    contributors {
      profile {
        id
        canonicalSlug
        firstName
        lastName
        profileRelatedLinks {
          uri
          text
          subtype
        }
        primaryVisuals {
          thumbnail {
            xid
            longCaption
            shortCaption
            fallback
            aspect_ratios: aspectRatios {
              uncropped {
                instances {
                  url
                  width
                  height
                }
              }
              square {
                instances {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
    results(page: ${parseInt(pageNum)}, pageSize: 10) {
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
        resourceType
        audio {
          id
          encodings {
            httpFilePath
            durationMs
            durationHms
          }
        }
        contributors {
          profile {
            firstName
            lastName
          }
        }
        primaryVisuals {
          thumbnail {
            aspect_ratios: aspectRatios {
              uncropped {
                instances {
                  url
                  width
                  height
                }
              }
              widescreen {
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
          id
          title
          durationHms
          encodings {
            httpFilePath
          }
        }
        collectionRelatedLinks {
          url
          title
          prefix
        }
        ... on Link {
          destination
        }
      }
      totalItems
      nextPage
    }
  }
}`;
  return gql`
    ${q}
  `;
};

export default collectionQuery;
