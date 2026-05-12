// src/lib/variants/useVariantOptions.js

import { derived } from "svelte/store";

export function createVariantOptions(
  variants,
  selectedOptions,
  hasAvailableVariant,
) {
  const optionNames = variants[0]?.selectedOptions.map((o) => o.name) || [];

  const options = derived(selectedOptions, ($selectedOptions) => {
    function getOptionValues(optionName) {
      const values = [
        ...new Set(
          variants
            .map(
              (v) =>
                v.selectedOptions.find((o) => o.name === optionName)?.value,
            )
            .filter(Boolean),
        ),
      ];

      return values.map((value) => ({
        value,
        available: hasAvailableVariant(optionName, value),
        selected: $selectedOptions[optionName] === value,
      }));
    }

    return {
      optionNames,
      getOptionValues,
    };
  });

  return options;
}
