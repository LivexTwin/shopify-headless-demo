export const PRODUCT_DROP_FRAGMENT = `
  fragment ProductDropFragment on Product {
    id
    title
    handle

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

    variants(first: 10) {
      edges {
        node {
          id
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
  }
  `;
