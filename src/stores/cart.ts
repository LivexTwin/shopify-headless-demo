// src/stores/cart.ts
import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const cartId = persistentAtom<string | null>(
  "cartId", // key in localStorage
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const cart = atom<any>({
  id: null,
  lines: [],
  cost: {},
  checkoutUrl: null,
});
