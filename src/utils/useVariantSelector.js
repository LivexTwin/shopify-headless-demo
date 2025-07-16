// useVariantSelector.js

export function createVariantSelector(variants, savedOptions = null) {
  const optionNames = variants[0]?.selectedOptions.map((o) => o.name) || [];

  let selectedOptions = {};

  if (savedOptions) {
    selectedOptions = { ...savedOptions };
  } else if (variants.length > 0) {
    const initial = variants.find((v) => v.availableForSale) ?? variants[0];
    initial.selectedOptions.forEach((opt) => {
      selectedOptions[opt.name] = opt.value;
    });
  }

  function findMatchingVariant() {
    return variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    );
  }

  function updateOption(name, value) {
    selectedOptions = { ...selectedOptions, [name]: value };
    return {
      selectedOptions,
      selectedVariant: findMatchingVariant(),
    };
  }

  function hasAvailableVariant(optionName, optionValue) {
    const testOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };

    return variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.every(
          (opt) => testOptions[opt.name] === opt.value
        )
    );
  }

  return {
    optionNames,
    selectedOptions,
    findMatchingVariant,
    updateOption,
    hasAvailableVariant,
  };
}
