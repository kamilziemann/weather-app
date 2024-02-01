'use client';
import { Search } from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Location } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { useCallback, useState } from 'react';

const POPOVER_WIDTH = 'w-full max-w-5xl';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Location | undefined>();

  const handleSetActive = useCallback((product: Location) => {
    setSelected(product);
    setOpen(false);
  }, []);

  const displayName = selected ? selected.name : 'Select product';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 mt-4">
      <div className="max-w-5xl w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn('justify-between', POPOVER_WIDTH)}
            >
              {displayName}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent side="bottom" className={cn('PopoverContent', 'p-0', POPOVER_WIDTH)}>
            <Search selectedResult={selected} onSelectResult={handleSetActive} />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
