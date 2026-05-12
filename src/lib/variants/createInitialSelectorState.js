export function createInitialSelectorState(variants, initialOptions) {
  const selectedOptions = { ...initialOptions };

  const selectedVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value,
    ),
  );

  return {
    selectedOptions,
    selectedVariant,
  };
}
