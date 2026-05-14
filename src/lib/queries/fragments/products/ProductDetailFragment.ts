export const PRODUCT_DETAIL_FRAGMENT = `
fragment ProductDetailFragment on Product {
  id
  title
  descriptionHtml
  handle
  availableForSale
    options {
    name
    optionValues {
      name
      swatch {
        color
        image {
          previewImage {
            url
          }
        }
      }
    }
  }

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


  images(first: 10) {
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
        id
        title
        price {
          amount
          currencyCode
        }
        availableForSale
        quantityAvailable
        selectedOptions {
          name
          value
        }
      }
    }
  }
}
`;
