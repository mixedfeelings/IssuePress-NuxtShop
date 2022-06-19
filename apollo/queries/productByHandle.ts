import { gql } from "graphql-tag";
import { productVariants } from "~/apollo/fragments/productVariants";

export const productByHandle = gql`
  ${productVariants}
  query product($handle: String!) {
    productByHandle(handle: $handle) {
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
      descriptionHtml
      handle
      id
      images(first: 20) {
        edges {
          cursor
          node {
            altText
            height
            id
            url
            width
          }
        }
      }
      onlineStoreUrl
      options(first: 3) {
        id
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      productType
      tags
      title
      ...productVariants
      vendor
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
      metadata: metafield(namespace: "issuepress", key: "metadata") {
        value
        type
      }
      inkColors: metafield(namespace: "issuepress", key: "colors") {
        value
        type
      }
      papers: metafield(namespace: "issuepress", key: "papers") {
        value
        type
      }
      edition_size: metafield(namespace: "issuepress", key: "edition_size") {
        value
        type
      }
      cover: metafield(namespace: "issuepress", key: "cover") {
        value
        type
      }
      binding: metafield(namespace: "issuepress", key: "binding") {
        value
        type
      }
      process: metafield(namespace: "issuepress", key: "process") {
        value
        type
      }
      pages: metafield(namespace: "issuepress", key: "pages") {
        value
        type
      }
      dimensions: metafield(namespace: "issuepress", key: "dimensions") {
        value
        type
      }
    }
  }
`;
