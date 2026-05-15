export function parseOptionsFromUrl(search) {
  const params = new URLSearchParams(search);

  const options = {};

  for (const [key, value] of params.entries()) {
    if (key === "variant") continue;
    options[key] = value;
  }

  return options;
}

export function syncOptionsToUrl(options) {
  const url = new URL(window.location);

  // clear previous option params
  for (const key of Array.from(url.searchParams.keys())) {
    if (key !== "variant") {
      url.searchParams.delete(key);
    }
  }

  // set new options
  for (const [key, value] of Object.entries(options)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  window.history.replaceState({}, "", url);
}
