export const homeQuery = () => {
  const gqlQuery = JSON.stringify({
    query: `{
      homeList: collection(contentAreaSlug: "mprnews", slug: "homepage") {
        id
        title
        description
        descriptionText
        results(page: 1, pageSize: 20) {
          items {
            id
            title
            canonicalSlug
            resourceType
            description
            descriptionText
            primaryVisuals {
              thumbnail {
                aspect_ratios: aspectRatios {
                  thumbnail {
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
              id
              title
              durationHms
              encodings {
                httpFilePath
                playFilePath
                filename
                durationMs
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
        }
      }
      updraft: collection(
        contentAreaSlug: "mprnews" 
        slug: "weather-and-climate/updraft"
      ) {
        id
        results(page: 1, pageSize: 1) {
          items {
            id
            title
            resourceType
            canonicalSlug
          }
        }
      }
      alertConfig: potlatch(slug: "mprnews/info-alert") {
        slug
        json
      }
      homeStoryConfig: potlatch(slug: "mprnews/homepage-stories") {
        slug
        json
      }
    }`
  });
  return gqlQuery;
};
