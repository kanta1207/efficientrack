type FetchArgs = Parameters<typeof fetch>;

export const apiRequest = async <T>(url: FetchArgs[0], args: FetchArgs[1]): Promise<T> => {
  const res = await fetch(url, args);
  return res.json();
};
