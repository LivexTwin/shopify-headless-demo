// src/stores/cart.ts
import { persistentAtom } from "@nanostores/persistent";

export const cartId = persistentAtom<string | null>(
  "cartId", // key in localStorage
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const cart = persistentAtom<any>(
  "cartData",
  { lines: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
