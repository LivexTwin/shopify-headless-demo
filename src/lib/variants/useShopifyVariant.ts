export function createShopifyVariantResolver(product: any, mode = "detail") {
  const variants: any[] = product?.variants ?? [];
  const options: any[] = product?.options ?? [];
  let selectedOptions: Record<string, string> = {};

  const initialVariant = product?.selectedOrFirstAvailableVariant ?? null;

  if (mode === "quick" && initialVariant) {
    selectedOptions = initialVariant.selectedOptions.reduce(
      (acc: Record<string, string>, opt: any) => {
        acc[opt.name] = opt.value;
        return acc;
      },
      {},
    );
  }

  // Detail mode starts with no preselection to show all options

  function getSelectedOptions() {
    return { ...selectedOptions };
  }

  function updateOption(name: string, value: string) {
    selectedOptions = {
      ...selectedOptions,
      [name]: value,
    };
    console.log("resolver updateOption", { name, value, selectedOptions });
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
          .filter((v) => v.availableForSale)
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
