'use client';

import AlertDestructive from '@/components/AlertDestructive';
import ForecastDetails from '@/components/ForecastDetails';
import ForecastPreviewCard from '@/components/ForecastPreviewCard';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import api from '@/lib/api';
import { Location, WeatherReport } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDown, LoaderIcon, MapPin } from 'lucide-react';
import { useCallback, useState } from 'react';
import { extractDayAndMonth } from '@/lib/helpers';
import Search from '@/components/Search';

const POPOVER_WIDTH = 'w-full max-w-5xl';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number>(0);

  const { data, isLoading, isError } = useQuery<WeatherReport>({
    queryKey: ['weather-report', selectedLocation?.url],
    queryFn: () =>
      api
        .get('/forecast.json', { params: { q: selectedLocation?.url, days: 14, hour: 24 } })
        .then((res) => res.data),
    enabled: !!selectedLocation?.url,
  });

  const handleSetActive = useCallback((product: Location) => {
    setSelectedLocation(product);
    setOpen(false);
  }, []);

  const displayName = selectedLocation
    ? `${selectedLocation.name}, ${selectedLocation.country}`
    : 'Wybierz lokalizację';

  const selectedForecast = data ? data?.forecast.forecastday[selectedForecastIndex] : null;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pb-36 mt-4 gap-4 max-w-5xl mx-auto">
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
            <Search selectedResult={selectedLocation} onSelectResult={handleSetActive} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full flex justify-center">
        {!selectedLocation ? (
          <div className="text-center flex flex-col gap-2 items-center  border border-gray-200 p-10 rounded-xl">
            <MapPin className="h-20 w-20 text-gray-500" />
            <h2 className="text-2xl text-gray-700">Wybierz lokalizację i sprawdź pogodę!</h2>
          </div>
        ) : null}
        {isLoading ? <LoaderIcon className="animate-spin h-24 w-24 mt-4 basis-1/" /> : null}
        {isError ? <AlertDestructive /> : null}
        {data ? (
          <div className="w-full">
            <section className="max-w-[200px] sm:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[800px] w-full mx-auto">
              <Carousel>
                <CarouselContent>
                  {data.forecast.forecastday.map((props, index) => (
                    <CarouselItem
                      key={props.date_epoch}
                      className="sm:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                    >
                      <ForecastPreviewCard
                        {...props}
                        isSelected={index === selectedForecastIndex}
                        onClick={() => setSelectedForecastIndex(index)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>
            {selectedForecast ? (
              <div className="mt-8">
                <h1 className="text-2xl font-semibold text-center mb-8">
                  {selectedLocation?.name}, {selectedLocation?.country} |{' '}
                  {extractDayAndMonth(selectedForecast?.date)}
                </h1>
                <ForecastDetails forecast={selectedForecast} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
