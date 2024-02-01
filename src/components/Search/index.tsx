'use client';

import { useDebounce } from 'use-debounce';
import { Command, CommandInput } from '@/components/ui/command';
import type { Location } from '@/lib/types';
import { FC, useEffect, useState } from 'react';
import SearchResults from '@/components/Search/SearchResult';

interface SearchProps {
  selectedResult?: Location;
  onSelectResult: (product: Location) => void;
}

const Search: FC<SearchProps> = ({ selectedResult, onSelectResult }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setIsSearching(searchQuery.length > 0 && debouncedSearchQuery !== searchQuery);
  }, [searchQuery, debouncedSearchQuery]);

  const handleSelectResult = (product: Location) => {
    onSelectResult(product);
  };

  return (
    <Command shouldFilter={false} className="h-auto rounded-lg border border-b-0 shadow-md">
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Wyszukaj lokalizację"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
        isSearching={isSearching}
      />
    </Command>
  );
};

export default Search;
