import React from 'react';
import { observer } from 'mobx-react-lite';
import { synchronizationService } from '@/core/services/SynchronizationService';
import { Layout } from '@/core/types/domain/Layout';
import { ConfiguratorStore } from '@/stores/ConfiguratorStore';
import { ViewModeSwitcher } from '@/pages/ConfigurationEditorPage/components/ViewModeSwitcher';
import { Scene3DCanvas } from '@/pages/ConfigurationEditorPage/components/scene3DCanvas/Scene3DCanvas';
import { WallCanvas } from '@/pages/ConfigurationEditorPage/components/wallCanvas/WallCanvas';

interface ConfigurationEditorProps {
  loadedLayout: Layout;
}

export const ConfigurationEditor: React.FC<ConfigurationEditorProps> = observer(({ loadedLayout }: ConfigurationEditorProps) => {
  const [configuratorStore] = React.useState<ConfiguratorStore>(() => new ConfiguratorStore(synchronizationService, loadedLayout));

  let RenderedCanvasView: React.ReactElement = <></>;

  switch (true) {
    case configuratorStore.currentMode.type === 'edit' && configuratorStore.currentMode.subtype === 'walls':
      RenderedCanvasView = <WallCanvas configuratorStore={configuratorStore} />;
      break;
    case configuratorStore.currentMode.type === 'edit' && configuratorStore.currentMode.subtype === 'objects':
      RenderedCanvasView = <Scene3DCanvas configuratorStore={configuratorStore} />;
      break;
  }

  return (
    <div className="max-h-full w-full flex flex-col flex-grow relative overflow-auto">
      {RenderedCanvasView}

      <ViewModeSwitcher
        currentMode={configuratorStore.currentMode}
        enterWalls2DMode={configuratorStore.enter2DMode}
        enter3DMode={configuratorStore.enter3DMode}
        className="fixed bottom-2 right-2 m-auto w-fit bg-white"
      />
    </div>
  );
});
