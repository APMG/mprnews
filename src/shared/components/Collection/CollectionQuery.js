import gql from 'graphql-tag';

export function collectionQuery(contextSlug, pageNum) {
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
    }
  `;
}
