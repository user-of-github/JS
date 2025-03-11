import React from 'react';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { synchronizationService } from '@/core/services/SynchronizationService';
import type { LayoutPreview } from '@/core/types/domain/Layout';
import { ConfigurationsListStore } from '@/stores/ConfigurationsListStore';
import { AnimatedPage, pagePaddings } from '@/components/AnimatedPage';
import { LoadingWithoutResult } from '@/components/ui/Loading';
import { Typography } from '@/components/ui/Typography';
import { LayoutsList } from './components/LayoutsList';

export const LayoutsListPage: React.FC = observer(() => {
  const [layoutsListStore] = React.useState<ConfigurationsListStore>(() => new ConfigurationsListStore(synchronizationService));

  const [promise, setPromise] = React.useState<Promise<void> | null>(null);

  React.useEffect(() => {
    setPromise(layoutsListStore.fetchLayouts());
  }, []);

  return (
    <AnimatedPage className={`flex flex-col p-10 gap-y-10 overflow-y-auto ${pagePaddings}`}>
      <Typography variant="h2" className="font-normal">
        <FormattedMessage id="ui.layoutsList.title" />
      </Typography>
      {promise && (
        <LoadingWithoutResult promise={promise}>
          <LayoutsList
            onCreateLayout={layoutsListStore.createLayout}
            layoutsPreviews={layoutsListStore.layoutsPreviews}
            onDeleteLayout={layoutsListStore.removeLayout}
          />
        </LoadingWithoutResult>
      )}
    </AnimatedPage>
  );
});
