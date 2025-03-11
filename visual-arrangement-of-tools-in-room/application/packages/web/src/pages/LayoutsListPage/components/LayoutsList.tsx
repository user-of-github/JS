import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { Formatter } from '@/core/services/Formatter';
import type { LayoutPreview } from '@/core/types/domain/Layout';
import type { LayoutPreviewCallback } from '@/core/types/utility/callbacks';
import { useModal } from '@/components/hooks/useModal';
import { Button } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { type CreateLayoutDto, CreateLayoutModal } from '@/pages/LayoutsListPage/components/CreateLayoutModal';
import { toConfigurationLink } from '@/routes';

interface LayoutsListProps {
  layoutsPreviews: ReadonlyArray<LayoutPreview>;
  onCreateLayout: (layout: CreateLayoutDto) => void;
  onDeleteLayout: LayoutPreviewCallback;
}

export const LayoutsList: React.FC<LayoutsListProps> = observer(({ layoutsPreviews, onCreateLayout, onDeleteLayout }) => {
  const [isOpened, open, close] = useModal();

  return (
    <div className="flex flex-col gap-y-5">
      <Button
        appearance="gradient-mono-green"
        className="flex justify-between gap-x-2 items-center max-sm:w-full max-sm:justify-center"
        onClick={open}
      >
        <FormattedMessage id="ui.layoutsList.createButton" />
        <Icon iconName="plus" width={10} fill="white" />
      </Button>

      <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {layoutsPreviews.map((layoutPreview: LayoutPreview) => (
          <LayoutListItem layoutPreview={layoutPreview} key={layoutPreview.id} onLayoutDelete={onDeleteLayout} />
        ))}
      </div>

      <CreateLayoutModal open={isOpened} onCreate={onCreateLayout} onClose={close} />
    </div>
  );
});

interface LayoutListItemProps {
  layoutPreview: Readonly<LayoutPreview>;
  onLayoutDelete: LayoutPreviewCallback;
}

const LayoutListItem: React.FC<LayoutListItemProps> = ({ layoutPreview, onLayoutDelete }) => (
  <section className="flex border border-border-main flex-col select-none group relative hover:shadow transition-all active:scale-[0.97]">
    <div className="hidden group-hover:flex absolute right-2 top-2">
      <Button
        appearance="flat-red-outlined"
        className="!w-6 !h-6 p-0 leading-0 items-center justify-center text-sm"
        onClick={() => onLayoutDelete(layoutPreview)}
      >
        &times;
      </Button>
    </div>
    <Link to={toConfigurationLink(layoutPreview.id)} className="flex flex-col">
      {layoutPreview.preview ? (
        <img className="object-cover h-32" src={layoutPreview.preview} alt={layoutPreview.name} />
      ) : (
        <div className="h-32 w-full flex flex-col items-center justify-center gap-y-3 border-b-border-main border-b">
          <Icon iconName="3d" className="fill-none stroke-border-main" />
        </div>
      )}
      <div className="flex flex-col gap-y-3 p-3">
        <Typography variant="h2" className="max-w-full truncate" title={layoutPreview.name}>
          {layoutPreview.name}
        </Typography>

        <Typography variant="paragraph-small">
          <FormattedMessage id="ui.layoutsList.created" />:
          <br />
          {Formatter.toLocalDateString(layoutPreview.createdDate)}
        </Typography>

        <Typography variant="paragraph-small">
          <FormattedMessage id="ui.layoutsList.modified" />:
          <br />
          {Formatter.toLocalDateString(layoutPreview.updatedDate)}
        </Typography>
      </div>
    </Link>
  </section>
);
