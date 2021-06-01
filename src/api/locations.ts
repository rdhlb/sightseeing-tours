export interface RideLocation {
  address: string;
  label: string;
  placeId: string;
}

export const searchLocations = async (
  query: string,
  abortSignal?: AbortSignal,
): Promise<RideLocation[]> => {
  const result = await fetch(
    `https://www.mydriver.com/api/v5/locations/autocomplete?searchString=${query}`,
    {
      signal: abortSignal,
    },
  );

  if (result.status !== 200) {
    throw new Error(`Oops... Error happened. Code: ${result.status}`);
  }
  return result.json();
};
