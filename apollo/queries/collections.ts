import { gql } from "graphql-tag";

export const collections = gql`
    query collection(
      $numCollections: Int,
      $cursor: String,
    ) {
      collections(
          first: $numCollections,
          after: $cursor,
          sortKey: TITLE,   
      ) {
        edges {
          cursor
          node {
            id
            title
            description
            handle
            artist: metafield(namespace: "issuepress", key: "artistCollection") {
                value
                type
            }
            products(first: 1) {
                edges {
                  cursor
                  node {
                    images(first: 1) {
                      edges {
                        node {
                          altText
                          height
                          id
                          url
                          width
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
          }
      }
    }
`;
