import { CART_LINE_FRAGMENT } from "../fragments/cart/CartLineFragment";

export const CART_LINES_ADD = `
  ${CART_LINE_FRAGMENT} 

  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              ...CartLineFragment
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
