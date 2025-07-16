export const CART_CREATE = `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        createdAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;
