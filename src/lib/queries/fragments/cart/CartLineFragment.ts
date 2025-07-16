export const CART_LINE_FRAGMENT = `
fragment CartLineFragment on CartLine {
  id
  quantity
  merchandise {
    ... on ProductVariant {
      id
      title
      price {
        amount
        currencyCode
      }
       quantityAvailable
      product {
        title
        handle
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
      }
    }
  }
}
`;
