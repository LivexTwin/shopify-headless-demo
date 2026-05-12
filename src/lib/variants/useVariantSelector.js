import { writable, derived, get } from "svelte/store";
import { syncOptionsToUrl } from "./useVariantUrlSync";

export function createVariantSelector(
  variants,
  initialSelectedOptions = {},
  syncToUrl = false,
) {
  const optionNames = [
    ...new Set(variants.flatMap((v) => v.selectedOptions.map((o) => o.name))),
  ];

  const selectedOptions = writable(initialSelectedOptions);

  const selectedVariant = derived(selectedOptions, ($options) => {
    return variants.find((variant) =>
      variant.selectedOptions.every((opt) => $options[opt.name] === opt.value),
    );
  });

  function updateOption(name, value) {
    selectedOptions.update((current) => {
      const next = {
        ...current,
        [name]: value,
      };

      // ✅ ONLY SYNC ON USER ACTION
      if (syncToUrl) {
        syncOptionsToUrl(next);
      }

      return next;
    });
  }

  function getOptionValues(optionName) {
    return [
      ...new Set(
        variants
          .map(
            (v) => v.selectedOptions.find((o) => o.name === optionName)?.value,
          )
          .filter(Boolean),
      ),
    ];
  }

  function hasAvailableVariant(optionName, optionValue) {
    const current = get(selectedOptions);

    const test = {
      ...current,
      [optionName]: optionValue,
    };

    return variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.every((opt) => test[opt.name] === opt.value),
    );
  }

  return {
    selectedOptions,
    selectedVariant,
    optionNames,
    updateOption,
    getOptionValues,
    hasAvailableVariant,
  };
}
