import { PRODUCT_CARD_FRAGMENT } from "./fragments/products/ProductCardFragment.ts";

export const GET_COLLECTIONS = `
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          products(first: 5) {
            edges {
              node {
                ...ProductCardFragment
              }
            }
          }
        }
      }
    }
  }
`;
