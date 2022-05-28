import { gql } from "graphql-tag";
import { cart } from "~/apollo/fragments/cart";

export const cartLinesUpdate = gql`
${cart}
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(lines: $lines, cartId: $cartId) {
    cart {
      ...cart
    }
    userErrors {
      code
      field
      message
    }
  }
}
`;
