import { SHOPIFY_ENDPOINT, SHOPIFY_TOKEN } from "../utils/config.ts";

export async function shopifyFetch(query: any, variables = {}) {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Shopify Storefront API Error:", errors);
    throw new Error("GraphQL error from Shopify");
  }

  return JSON.parse(JSON.stringify(data), edgeFlattener);
}

function edgeFlattener(key: string, value: any) {
  if (
    value &&
    typeof value === "object" &&
    Array.isArray(value.edges) &&
    value.edges.every((e) => e.node)
  ) {
    return value.edges.map((e) => e.node);
  }
  return value;
}
