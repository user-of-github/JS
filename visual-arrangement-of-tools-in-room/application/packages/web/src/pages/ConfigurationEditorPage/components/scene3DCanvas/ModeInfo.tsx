import React from 'react';
import { FormattedMessage } from 'react-intl';
import { m, motion } from 'framer-motion';
import { Formatter } from '@/core/services/Formatter';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import type { Product } from '@/core/types/domain/Product';
import { localization } from '@/stores/Localization';
import type { InstallationMode, MovingMode, SceneEditMode, SelectedMode } from '@/stores/scene3D/types';
import { animatedComponentProperties } from '@/components/AnimatedPage';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { cn } from '@/components/utils';
import { sideBarAsPartOfGridProps } from '@/pages/ConfigurationEditorPage/components/layout/SideBarLayout';

interface ModeInfoProps {
  mode: Readonly<SceneEditMode>;
  cancelInstallation: VoidFunction;
  cancelMoving: VoidFunction;
  removeProduct: VoidFunction;
  moveProduct: VoidFunction;

  goBack: VoidFunction;
}

export const ModeInfo: React.FC<ModeInfoProps> = ({ mode, cancelInstallation, removeProduct, moveProduct, goBack, cancelMoving }) => {
  let Component: React.ReactElement;

  switch (mode.type) {
    case 'installation':
      Component = <InstallationModeInfo selected={mode.item} cancelInstallation={cancelInstallation} goBack={cancelInstallation} />;
      break;
    case 'selected':
      Component = <SelectedModeInfo selected={mode.selected} goBack={goBack} onMove={moveProduct} onRemove={removeProduct} />;
      break;
    case 'moving':
      Component = <MovingModeInfo selected={mode.selected} onCancel={cancelMoving} goBack={cancelMoving} />;
      break;
    default:
      return <></>;
  }

  return (
    <motion.aside
      {...animatedComponentProperties}
      className={cn('h-full m-auto bg-white rounded flex gap-x-4 w-full', sideBarAsPartOfGridProps)}
    >
      {Component}
    </motion.aside>
  );
};

export const isModeInfoShown = (mode: Readonly<SceneEditMode>): mode is InstallationMode | SelectedMode | MovingMode => {
  return mode.type === 'installation' || mode.type === 'selected' || mode.type === 'moving';
};

const Heading: React.FC<{ messageKey: string }> = ({ messageKey }) => (
  <Typography variant="h4">
    <FormattedMessage id={messageKey} />
  </Typography>
);

const VerticalContent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-y-5 pr-3 grow pt-10">{children}</div>
);

interface InstallationModeInfoProps {
  cancelInstallation: VoidFunction;
  selected: Readonly<Product>;
  goBack: VoidFunction;
}

const InstallationModeInfo: React.FC<InstallationModeInfoProps> = ({ selected, cancelInstallation, goBack }) => (
  <>
    <Back onClick={goBack} />
    <VerticalContent>
      <Heading messageKey="ui.configurator.menu.installationMode" />

      <ProductCard
        className="rounded-none !outline-none !border-none !shadow-none hover:shadow-none hover:outline-none"
        price={Formatter.formatPrice(selected.price)}
        title={localization.formatMessage(`data.product.${selected.article}`)}
        imageUrl={selected.image}
        description={Formatter.formatProductDimensions(selected.dimensions)}
      />
      <div className="flex flex-row gap-2 w-full">
        <Button onClick={cancelInstallation} appearance="gradient-mono-red">
          <FormattedMessage id="ui.configurator.cancelInstallation" />
        </Button>
      </div>
    </VerticalContent>
  </>
);

interface SelectedModeInfoProps {
  selected: Readonly<PositionedProduct>;
  onRemove: VoidFunction;
  onMove: VoidFunction;
  goBack: VoidFunction;
}

const SelectedModeInfo: React.FC<SelectedModeInfoProps> = ({ onMove, onRemove, selected, goBack }) => (
  <>
    <Back onClick={goBack} />
    <VerticalContent>
      <Heading messageKey="ui.configurator.menu.installationMode" />

      <ProductCard
        className="rounded-none !outline-none !border-none !shadow-none hover:shadow-none hover:outline-none"
        price={Formatter.formatPrice(selected.price)}
        title={localization.formatMessage(`data.product.${selected.article}`)}
        imageUrl={selected.image}
        description={Formatter.formatProductDimensions(selected.dimensions)}
      />

      <div className="flex flex-row gap-2 w-full">
        <Button onClick={onMove} appearance="flat-light" size="smallPadding" className="w-full">
          <Typography variant="paragraph-small">
            <FormattedMessage id="ui.configurator.move" />
          </Typography>
        </Button>

        <Button onClick={onRemove} appearance="flat-red-outlined" size="smallPadding" className="w-full">
          <Typography variant="paragraph-small">
            <FormattedMessage id="ui.configurator.remove" />
          </Typography>
        </Button>
      </div>
    </VerticalContent>
  </>
);

interface MovingModeInfoProps {
  selected: Readonly<PositionedProduct>;
  onCancel: VoidFunction;
  goBack: VoidFunction;
}

const MovingModeInfo: React.FC<MovingModeInfoProps> = ({ selected, goBack, onCancel }) => (
  <>
    <Back onClick={goBack} />
    <VerticalContent>
      <Heading messageKey="ui.configurator.menu.movingMode" />

      <ProductCard
        className="rounded-none !outline-none !border-none !shadow-none hover:shadow-none hover:outline-none"
        price={Formatter.formatPrice(selected.price)}
        title={localization.formatMessage(`data.product.${selected.article}`)}
        imageUrl={selected.image}
        description={Formatter.formatProductDimensions(selected.dimensions)}
      />

      <div className="flex flex-row gap-2 w-full">
        <Button onClick={onCancel} appearance="flat-light" className="w-full justify-center">
          <Typography variant="paragraph-small">
            <FormattedMessage id="ui.configurator.getProductBack" />
          </Typography>
        </Button>
      </div>
    </VerticalContent>
  </>
);

const Back: React.FC<{ onClick: VoidFunction }> = ({ onClick }) => {
  return (
    <button className="h-full border-r border-r-border-main px-2" onClick={onClick}>
      <Icon iconName="arrowLeft" width={25} />
    </button>
  );
};
