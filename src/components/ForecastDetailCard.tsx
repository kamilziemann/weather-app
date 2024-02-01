import { FC, cloneElement } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  title: string;
  content: string;
  icon: JSX.Element;
}

const ForecastDetailCard: FC<Props> = ({ title, content, icon }) => {
  const Icon = cloneElement(icon, { className: 'h-4 w-4 text-muted-foreground' });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{content}</div>
      </CardContent>
    </Card>
  );
};

export default ForecastDetailCard;
