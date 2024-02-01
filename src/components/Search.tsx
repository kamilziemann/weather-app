'use client';
import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import type { Location } from '@/lib/types';

import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface SearchProps {
  selectedResult?: Location;
  onSelectResult: (product: Location) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  React.useEffect(() => {
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
        placeholder="Search for product"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
        isSearching={isSearching}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult?: Location;
  onSelectResult: (product: Location) => void;
  isSearching: boolean;
}

function SearchResults({ query, selectedResult, onSelectResult, isSearching }: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const { data, isLoading, isError } = useQuery<Location[]>({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () =>
      api.get('/search.json', { params: { query: debouncedSearchQuery } }).then((res) => res.data),
    enabled,
  });

  if (!enabled && !isSearching) return null;

  return (
    <CommandList>
      {(isSearching || isLoading) && <div className="p-4 text-sm">Ładowanie...</div>}
      {!isError && !isLoading && !isSearching && !data?.length && (
        <div className="p-4 text-sm">Nie znaleziono lokalizacji</div>
      )}
      {isError && <div className="p-4 text-sm">Coś poszło nie tak</div>}

      {data?.map(({ id, name, ...props }) => (
        <CommandItem key={id} onSelect={() => onSelectResult({ id, name, ...props })} value={name}>
          <Check
            className={cn('mr-2 h-4 w-4', selectedResult?.id === id ? 'opacity-100' : 'opacity-0')}
          />
          {name}
        </CommandItem>
      ))}
    </CommandList>
  );
}
