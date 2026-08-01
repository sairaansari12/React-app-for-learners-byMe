const BASE_API = 'https://jsonplaceholder.typicode.com';

function buildUrl(resource, params) {
  const url = new URL(`${BASE_API}/${resource}`);
  if (params && typeof params === 'object') {
    Object.keys(params).forEach((k) => {
      if (params[k] !== undefined && params[k] !== null) url.searchParams.append(k, String(params[k]));
    });
  }
  return url.toString();
}

export function getResourceUrl(resource, params) {
  return buildUrl(resource, params);
}

export async function fetchFromApi(resource, params) {
  const url = buildUrl(resource, params);
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch failed for ${resource}: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

export default { getResourceUrl, fetchFromApi };
