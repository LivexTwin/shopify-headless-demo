export function resolveInitialOptions(
  variants,
  urlOptions = {},
  mode = "quick",
) {
  const first = variants?.[0];
  if (!first) return {};

  const defaults = Object.fromEntries(
    first.selectedOptions.map((o) => [o.name, o.value]),
  );

  // 1. apply URL overrides first
  const merged = {
    ...defaults,
    ...urlOptions,
  };

  // 2. mode-specific rules
  if (mode === "detail") {
    // force Size to be UNSET unless URL explicitly set it
    if (!urlOptions.Size) {
      merged.Size = null;
    }
  }

  return merged;
}
