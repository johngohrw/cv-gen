export function getSearchParams() {
  const url = new URL(window.location.href);
  const searchParamsEncoded = new URLSearchParams(url.search);
  return decodeSearchParamsObject(searchParamsEncoded);
}

// decode an encoded searchParams object for both keys and values
export const decodeSearchParamsObject = (searchParams: URLSearchParams) => {
  return Object.entries(Object.fromEntries(searchParams.entries())).reduce(
    (acc: any, [key, val]) => {
      acc[decodeURIComponent(key)] = decodeURIComponent(val);
      return acc;
    },
    {}
  );
};
