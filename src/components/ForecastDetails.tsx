import { ForecastDay } from '@/lib/types';
import { FC } from 'react';

interface Props {
  forecast: ForecastDay;
}

const ForecastDetails: FC<Props> = () => {
  console.log();
  return (
    <>
      <p>a</p>
      <p>b</p>
    </>
  );
};

export default ForecastDetails;
