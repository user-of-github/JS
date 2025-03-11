import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface LoadingProps<ValueType> {
  promise: Promise<ValueType>;
  children: Function;
}

export const LoadingWithResult = <ValueType,>({ promise, children }: LoadingProps<ValueType>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [response, setResponse] = React.useState<ValueType | null>(null);

  React.useEffect(() => {
    if (promise) {
      setIsLoading(true);

      promise
        .then(setResponse)
        .catch(setResponse)
        .finally(() => setIsLoading(false));
    }
  }, [promise]);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return children(response!);
  }
};

interface LoadingWithoutResponseProps {
  promise: Promise<unknown>;
  children: React.ReactNode;
}

export const LoadingWithoutResult: React.FC<LoadingWithoutResponseProps> = ({ promise, children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    promise.finally(() => setIsLoading(false));
  }, [promise]);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return children;
  }
};
