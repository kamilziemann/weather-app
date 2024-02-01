import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ForecastDay } from '@/lib/types';
import { extractDayAndMonth } from '@/lib/helpers';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Props extends ForecastDay {
  isSelected?: boolean;
  onClick?: () => void;
}

const ForecastPreviewCard: FC<Props> = ({ date, day, isSelected = false, onClick }) => (
  <Card
    className={cn(
      'max-w-[200px] h-full flex flex-col justify-between hover:bg-slate-50 cursor-pointer select-none',
      isSelected && 'bg-slate-200 border-gray-400 hover:bg-slate-200 cursor-default',
    )}
    onClick={onClick}
  >
    <CardHeader>
      <CardTitle className="flex flex-row gap-1 items-center justify-center text-neutral-800 font-mono text-4xl">
        {extractDayAndMonth(date)}
      </CardTitle>
      <CardDescription className="text-mono text-xs break-words text-center">
        {day.condition.text}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <Image
          src={`https:${day.condition.icon}`}
          alt="Image"
          fill
          className="rounded-md object-contain"
        />
      </div>
    </CardContent>
    <CardFooter className="flex items-center justify-center space-x-4 text-md">
      <p>{day.maxtemp_c}°</p>
      <Separator orientation="vertical" className="h-6" />
      <p>{day.mintemp_c}°</p>
    </CardFooter>
  </Card>
);

export default ForecastPreviewCard;
