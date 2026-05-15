export function createShopifyVariantResolver(
  product: any,
  mode = "detail",
  initialOptions: Record<string, string> = {},
) {
  const variants: any[] = product?.variants ?? [];
  const options: any[] = product?.options ?? [];
  let selectedOptions: Record<string, string> = { ...initialOptions };

  const initialVariant = product?.selectedOrFirstAvailableVariant ?? null;

  if (mode === "quick" && initialVariant) {
    selectedOptions = {
      ...initialVariant.selectedOptions.reduce(
        (acc: Record<string, string>, opt: any) => {
          acc[opt.name] = opt.value;
          return acc;
        },
        {},
      ),
      ...selectedOptions,
    };
  }

  // Detail mode starts with no preselection to show all options
  if (mode === "detail" && Object.keys(selectedOptions).length === 0) {
    const firstAvailable = product?.selectedOrFirstAvailableVariant;

    if (firstAvailable) {
      const colorOption = firstAvailable.selectedOptions.find(
        (o) => o.name === "Color",
      );

      if (colorOption) {
        selectedOptions = {
          Color: colorOption.value,
          // Size intentionally left empty
        };
      }
    }
  }

  function getSelectedOptions() {
    return { ...selectedOptions };
  }

  function updateOption(name: string, value: string) {
    selectedOptions = {
      ...selectedOptions,
      [name]: value,
    };
  }

  function hasAvailableOption(optionName, optionValue) {
    const test = {
      ...selectedOptions,
      [optionName]: optionValue,
    };

    return variants.some((v) => {
      if (!v.availableForSale) return false;

      return v.selectedOptions.every((o) => {
        const selected = test[o.name];

        // ignore unselected axes
        if (!selected) return true;

        return selected === o.value;
      });
    });
  }

  function getAvailableOptions(optionName: string) {
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

  function getSelectedVariant() {
    return (
      variants.find((v) =>
        v.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
      ) ?? null
    );
  }

  function isVariantValidForCart() {
    const variant = getSelectedVariant();

    return Boolean(variant?.id && variant.availableForSale);
  }

  return {
    updateOption,
    getSelectedOptions,
    getSelectedVariant,
    getAvailableOptions,
    isVariantValidForCart,
    hasAvailableOption,
  };
}
