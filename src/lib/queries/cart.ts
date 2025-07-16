import { CART_LINE_FRAGMENT } from "./fragments/cart/CartLineFragment.ts";

export const GET_CART = `
  ${CART_LINE_FRAGMENT}

  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            ...CartLineFragment
          }
        }
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;
