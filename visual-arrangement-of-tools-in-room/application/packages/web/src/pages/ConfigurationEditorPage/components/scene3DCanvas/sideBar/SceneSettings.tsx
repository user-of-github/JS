import React from 'react';
import { motion } from 'framer-motion';
import { localization } from '@/stores/Localization';
import { SceneSettingsStore } from '@/stores/scene3D/SceneSettingsStore';
import { RangeSlider } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';

interface SceneSettingsProps {
  gridOpacity: number;
  onGridOpacityChange: (value: number) => void;
}

export const SceneSettings: React.FC<SceneSettingsProps> = ({ gridOpacity, onGridOpacityChange }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-y-10 pb-32">
      <div className={settingsBlockClass}>
        <Typography variant="h5" className={settingsBlockTitleClass}>
          {localization.formatMessage('ui.configurator.sceneSettings.gridSettings')}
        </Typography>

        <RangeSlider
          min={SceneSettingsStore.gridOpacityConstraint.min}
          max={SceneSettingsStore.gridOpacityConstraint.max}
          step={5}
          value={gridOpacity}
          id="walls-thickness"
          label={localization.formatMessage('ui.configurator.sceneSettings.opacity') + ' ' + gridOpacity + ' %'}
          onChange={onGridOpacityChange}
        />
      </div>
    </motion.div>
  );
};

const settingsBlockTitleClass = 'mb-2 font-medium';
const settingsBlockClass = 'flex flex-col border-b-primary-200 border-b py-2' as const;
