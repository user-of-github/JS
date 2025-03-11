import React from 'react';
import { motion } from 'framer-motion';
import type { Material, TextureMaterial } from '@/core/types/domain/Material';
import { localization } from '@/stores/Localization';
import { RadioButtonCard } from '@/components/ui';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Typography } from '@/components/ui/Typography';

interface TextureChoiceProps {
  selected: Material | null;
  lastSelectedColorCode: string;
  textures: ReadonlyArray<TextureMaterial>;
  onSelect: (texture: Material) => void;
  whichMaterialIsLoading?: Material | null;
}

export const TextureChoice: React.FC<TextureChoiceProps> = ({
  selected,
  onSelect,
  textures,
  lastSelectedColorCode,
  whichMaterialIsLoading
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-y-10 pb-32">
    <div className="flex flex-col gap-y-4 overflow-y-auto">
      <Typography variant="h5">{localization.formatMessage('ui.configurator.menu.predefinedTextures')}</Typography>

      <div className="w-full grid grid-cols-2 max-xl:grid-cols-1 gap-x-1.5 gap-y-2.5">
        {textures.map((texture: TextureMaterial) => (
          <RadioButtonCard
            key={texture.view + texture.name}
            value={texture.view}
            name="wall-texture-form"
            className="relative"
            checked={JSON.stringify(texture) === JSON.stringify(selected)}
            onChange={() => onSelect(texture)}
            id={`${texture.view}-wallTexture-${texture.name}`}
            disabled={!!whichMaterialIsLoading}
          >
            <TextureCard texture={texture} key={texture.name} />
            {whichMaterialIsLoading?.type === 'texture' && whichMaterialIsLoading.view === texture.view && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/90 flex items-center justify-center">
                <LoadingSpinner hideText />
              </div>
            )}
          </RadioButtonCard>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-y-4">
      <Typography variant="h5">{localization.formatMessage('ui.configurator.menu.staticColor')}</Typography>

      <div className="w-full gap-1.5 grid grid-cols-2 max-xl:grid-cols-1 items-center place-items-center">
        <RadioButtonCard
          key="textture-color"
          value="color"
          name="wall-texture-form"
          checked={selected?.type === 'color'}
          onChange={() => onSelect({ type: 'color', color: lastSelectedColorCode })}
          id="wallTexture-color"
          disabled={!!whichMaterialIsLoading}
          className="relative flex flex-col justify-center h-16"
        >
          {selected?.type === 'color' && (
            <ColorPicker
              disabled={!!whichMaterialIsLoading}
              onColorChange={(value) => {
                console.log('color changed', value);
                debugger;
                onSelect({ type: 'color', color: value });
              }}
              defaultValue={lastSelectedColorCode}
            />
          )}
          <div className="info">
            <Typography variant="paragraph">{localization.formatMessage('ui.configurator.menu.pickColor')}</Typography>
          </div>
          {whichMaterialIsLoading?.type === 'color' && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/90 flex items-center justify-center">
              <LoadingSpinner hideText />
            </div>
          )}
        </RadioButtonCard>
      </div>
    </div>
  </motion.div>
);

// @TODO: how to make here text also translated ? Load translation with rexrures names, objects and so on
const TextureCard: React.FC<{ texture: TextureMaterial }> = ({ texture }) => (
  <div className="w-full flex flex-col">
    <img className="max-h-20 !w-full text-sky-500 object-cover" src={texture.preview} alt={texture.name} />
    <div className="w-full text-lg max-md:text-sm font-semibold truncate py-3 px-2">
      <Typography variant="paragraph">{texture.name}</Typography>
    </div>
  </div>
);

const ColorCard: React.FC = () => (
  <div className="w-full flex flex-col">
    <div className="flex flex-col h-20 w-full">
      <div className="w-full h-1/2 flex bg-purple-400"></div>
      <div className="flex w-full h-1/2">
        <div className="w-1/2 h-full bg-green-400"></div>
        <div className="w-1/2 h-full bg-yellow-400"></div>
      </div>
    </div>
    <div className="w-full text-lg max-md:text-sm font-semibold truncate py-3 px-2">
      <Typography variant="paragraph">{localization.formatMessage('ui.configurator.menu.pickColor')}</Typography>
    </div>
  </div>
);
