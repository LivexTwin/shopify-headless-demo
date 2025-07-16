# Shopify Headless Starter

## Overview

A minimal starter template built with Astro + Svelte and Shopify Storefront API for fast headless Shopify storefront development.

## Features

- Product listing & detail pages
- Cart with inventory safeguards
- Variant selection UI
- Utility functions for currency, images, and formatting

## Tech Stack

- Astro
- Svelte
- Shopify Storefront API
- TypeScript

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your Shopify domain and Storefront API token
3. Install dependencies:

```
npm install
```

4. Run the dev server by running:

```
npm run dev
```

## Environment Variables

See `.env.example` for required variables:

`PUBLIC_SHOPIFY_DOMAIN` — Your Shopify store domain  
`PUBLIC_SHOPIFY_TOKEN` — Your Storefront API access token

## Notes

This is a barebones starter. Customize and extend it to fit your project needs.

Uses Shopify API version 2025-07.
