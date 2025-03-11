import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { synchronizationService } from '@/core/services/SynchronizationService';
import { Layout } from '@/core/types/domain/Layout';
import { AnimatedPage } from '@/components/AnimatedPage';
import { LoadingWithResult } from '@/components/ui/Loading';
import { NotFoundLayoutPage } from '@/pages/ConfigurationEditorPage/NotFoundPage';
import { ConfigurationEditor } from '@/pages/ConfigurationEditorPage/components/ConfigurationEditor';
import { Routes } from '@/routes';

export const ConfiguratorEditorPage: React.FC = () => {
  const { configurationId } = useParams();
  const [promise, setPromise] = React.useState<Promise<Layout | null> | null>(null);

  React.useEffect(() => setPromise(synchronizationService.fetchLayout(configurationId)), []);

  return (
    <AnimatedPage className="flex flex-col flex-grow w-full relative">
      {promise && (
        <LoadingWithResult promise={promise}>
          {(data: Layout | null): React.ReactElement => {
            if (!data) {
              return <NotFoundLayoutPage />;
            } else {
              return <ConfigurationEditor loadedLayout={data} />;
            }
          }}
        </LoadingWithResult>
      )}
    </AnimatedPage>
  );
};
