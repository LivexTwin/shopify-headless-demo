import { PRODUCT_CARD_FRAGMENT } from "./fragments/products/ProductCardFragment.ts";
import { PRODUCT_DETAIL_FRAGMENT } from "./fragments/products/ProductDetailFragment.ts";

export const GET_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}

  query GetProducts {
    products(first: 10) {
      edges {
        node {
          ...ProductCardFragment
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_DETAIL_FRAGMENT}

  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductDetailFragment
    }
  }
`;

export const GET_PRODUCT_HANDLES = `
  query GetProductHandles {
    products(first: 50) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
