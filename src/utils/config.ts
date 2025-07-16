export const SHOPIFY_DOMAIN = import.meta.env.PUBLIC_SHOPIFY_DOMAIN;
export const SHOPIFY_TOKEN = import.meta.env.PUBLIC_SHOPIFY_TOKEN;
export const SHOPIFY_API_VERSION = "2025-07"; // Use the latest stable version or your preferred version

export const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
