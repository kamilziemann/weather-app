import { FC } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  title?: string;
  description?: string;
}

const AlertDestructive: FC<Props> = ({
  title = 'Error',
  description = 'Wystąpił błąd, spróbuj odświeżyć stronę ',
}) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);

export default AlertDestructive;
