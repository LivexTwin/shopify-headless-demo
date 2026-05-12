import { readOptionsFromUrl } from "./useVariantUrlSync";

export function getInitialOptions(variants) {
  const urlOptions = readOptionsFromUrl();

  // If URL has values → trust it completely
  if (Object.keys(urlOptions).length > 0) {
    return urlOptions;
  }

  // fallback: default first available variant
  const first = variants?.[0];

  const defaults = {};

  first?.selectedOptions?.forEach((opt) => {
    defaults[opt.name] = opt.value;
  });

  return defaults;
}
