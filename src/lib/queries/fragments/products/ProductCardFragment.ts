export const PRODUCT_CARD_FRAGMENT = `
fragment ProductCardFragment on Product {
  id
  title
  handle
  availableForSale
  images(first: 1) {
    edges {
      node {
        url
        altText
        width
        height  
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        price {
          amount
          currencyCode
        }
        availableForSale
      }
    }
  }
}
`;
