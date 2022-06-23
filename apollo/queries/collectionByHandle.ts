import { gql } from "graphql-tag";

export const collectionByHandle = gql`
  query collection(
    $handle: String!
    $numProducts: Int
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $cursor: String
  ) {
    collectionByHandle(handle: $handle) {
      description
      descriptionHtml
      handle
      id
      image {
        altText
        height
        transformedSrc(maxWidth: 3000)
        width
      }
      title
      products(first: $numProducts, sortKey: $sortKey, reverse: $reverse, after: $cursor) {
        edges {
          cursor
          node {
            availableForSale
            compareAtPriceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            description
            handle
            id
            images(first: 2) {
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
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            tags
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  sku
                }
              }
            }
            artist: metafield(namespace: "issuepress", key: "artist") {
              value
              type
            }
            artist2: metafield(namespace: "issuepress", key: "artist2") {
              value
              type
            }
            date: metafield(namespace: "issuepress", key: "date") {
              value
              type
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
  }
`;
