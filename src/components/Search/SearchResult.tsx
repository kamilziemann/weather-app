'use client';

import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { CommandItem, CommandList } from '@/components/ui/command';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import { FC } from 'react';

interface SearchResultsProps {
  query: string;
  selectedResult?: Location;
  onSelectResult: (product: Location) => void;
  isSearching: boolean;
}

const SearchResults: FC<SearchResultsProps> = ({
  query,
  selectedResult,
  onSelectResult,
  isSearching,
}) => {
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

      {data?.map(({ id, name, country, ...props }) => (
        <CommandItem
          key={id}
          onSelect={() => onSelectResult({ id, name, country, ...props })}
          value={name}
        >
          <Check
            className={cn('mr-2 h-4 w-4', selectedResult?.id === id ? 'opacity-100' : 'opacity-0')}
          />
          {name}, {country}
        </CommandItem>
      ))}
    </CommandList>
  );
};

export default SearchResults;
