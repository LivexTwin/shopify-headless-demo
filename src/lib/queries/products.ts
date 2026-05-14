import { PRODUCT_CARD_FRAGMENT } from "./fragments/products/ProductCardFragment.ts";
import { PRODUCT_DETAIL_FRAGMENT } from "./fragments/products/ProductDetailFragment.ts";
import { PRODUCT_DROP_FRAGMENT } from "./fragments/products/ProductDropFragment.ts";

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
      selectedOrFirstAvailableVariant {
        id
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        availableForSale
        quantityAvailable
      }
    }
  }
`;

export const GET_VARIANT_BY_SELECTED_OPTIONS = `
  query GetVariantBySelectedOptions($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    productByHandle(handle: $handle) {
      variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        availableForSale
        quantityAvailable
      }
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

export const GET_DROP_PRODUCT = `
  ${PRODUCT_DROP_FRAGMENT}

  query GetDropProduct {
    products(first: 1) {
      nodes {
        ...ProductDropFragment
      }
    }
  }
`;
