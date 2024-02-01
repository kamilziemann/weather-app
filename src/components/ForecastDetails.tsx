import ForecastDetailCard from '@/components/ForecastDetailCard';
import { ForecastDay } from '@/lib/types';
import { CloudHail, CloudRain, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react';
import { FC } from 'react';

interface Props {
  forecast: ForecastDay;
}

const ForecastDetails: FC<Props> = ({ forecast }) => (
  <div className="grid gap-4 grid-cols-auto-fill-200">
    <ForecastDetailCard
      title="Średnia temperatura"
      content={`${forecast.day.avgtemp_c}°`}
      icon={<Thermometer />}
    />
    <ForecastDetailCard
      title="Szansa opadów"
      content={`${forecast.day.daily_chance_of_rain}%`}
      icon={<CloudHail />}
    />
    <ForecastDetailCard
      title="Opady"
      content={`${forecast.day.totalprecip_mm}mm`}
      icon={<CloudRain />}
    />
    <ForecastDetailCard
      title="Maksymalny wiatr"
      content={`${forecast.day.maxwind_kph} km/h`}
      icon={<Wind />}
    />
    <ForecastDetailCard title="Wschód słońca" content={forecast.astro.sunrise} icon={<Sunrise />} />
    <ForecastDetailCard title="Zachód słońca" content={forecast.astro.sunset} icon={<Sunset />} />
  </div>
);

export default ForecastDetails;
