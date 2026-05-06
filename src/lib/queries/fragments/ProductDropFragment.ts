export const PRODUCT_DROP_FRAGMENT = `
fragment ProductDropFragment on Product {
  id
  title
  handle

  images(first: 10) {
    nodes {
      url
      altText
      width
      height
    }
  }

  variants(first: 1) {
    nodes {
      price {
        amount
      }
    }
  }
}
`;
