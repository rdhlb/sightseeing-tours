import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useState } from 'react';
import { useAsyncAbortable } from 'react-async-hook';
import useConstant from 'use-constant';

import { searchLocations } from '../api/locations';

export const useSearchLocations = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce the original search async function
  const debouncedSearchLocations = useConstant(() => AwesomeDebouncePromise(searchLocations, 300));

  const { loading, result, error } = useAsyncAbortable(
    async (abortSignal, text) => {
      // If the input is empty, return nothing immediately (without the debouncing delay!)
      if (text.length === 0) {
        return [];
      }
      // Else we use the debounced api
      else {
        return debouncedSearchLocations(text, abortSignal);
      }
    },
    // Ensure a new request is made everytime the text changes (even if it's debounced)
    [searchQuery],
  );

  // Return everything needed for the hook consumer
  return {
    searchQuery,
    setSearchQuery,
    isSearchLoading: loading,
    searchResults: result || [],
    searchError: error,
  };
};
