const isBrowser = typeof window !== "undefined";

export function syncOptionsToUrl(selectedOptions) {
  if (!isBrowser) return;

  const url = new URL(window.location.href);

  Object.entries(selectedOptions).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  window.history.replaceState({}, "", url);
}

export function readOptionsFromUrl() {
  if (!isBrowser) return {};

  const params = new URLSearchParams(window.location.search);

  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}
