import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Formatter } from '@/core/services/Formatter';
import type { GroupedProductByCount } from '@/core/types/domain/GroupedByCount';
import { localization } from '@/stores/Localization';
import { Button } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { Typography } from '@/components/ui/Typography';

interface ReportModalProps {
  items: ReadonlyArray<GroupedProductByCount>;
  opened: boolean;
  onClose: VoidFunction;
}
export const SummaryModal: React.FC<ReportModalProps> = ({ opened, items, onClose }) => {
  const [sum, totalCount] = items.reduce(
    ([resultSum, resultCount], current) => {
      return [resultSum + current.count * current.price, resultCount + current.count];
    },
    [0, 0]
  );

  return (
    <Modal
      opened={opened}
      className="fixed top-0 left-0 right-0 bottom-0 bg-white w-full h-dvh overflow-y-auto flex flex-col justify-between"
    >
      <div className="white w-full h-full relative flex flex-col justify-between gap-y-5 pt-10 pb-5 px-10">
        <header className="sticky top-0 flex w-full justify-between items-center py-6 px-6 bg-white border-b border-border-main">
          <Typography variant="h3">
            <FormattedMessage id="ui.configurator.summary.title" />
          </Typography>

          <Button
            className="text-xl leading-[12rem] rounded p-0 w-12 h-12 flex items-center justify-center"
            onClick={onClose}
            appearance="gradient-mono-red"
          >
            &times;
          </Button>
        </header>
        <div className="grid grid-cols-3 gap-x-5 max-lg:grid-cols-5 max-md:flex max-md:flex-col max-md:gap-y-7 grow">
          <div className="flex flex-col w-full gap-y-2 col-span-2 max-lg:col-span-3">
            {items.map((item) => (
              <CartRow
                key={item.article}
                count={item.count}
                price={item.price}
                imageUrl={item.image}
                title={localization.formatMessage(`data.product.${item.article}`)}
              />
            ))}
          </div>
          <div className="flex flex-col w-full rounded border border-gray-200 p-4 pt-6 gap-y-6 max-lg:col-span-2">
            <Typography variant="h3">
              <FormattedMessage id="ui.configurator.summary.orderSummary" />
            </Typography>

            <div className="flex flex-col gap-y-1.5">
              <div className="flex w-full justify-between">
                <Typography variant="paragraph" className="text-border-main-active">
                  <FormattedMessage id="ui.configurator.summary.totalCount" />
                </Typography>

                <Typography variant="paragraph" className="font-bold">
                  {totalCount}
                </Typography>
              </div>

              <div className="flex w-full justify-between">
                <Typography variant="paragraph" className="text-border-main-active">
                  <FormattedMessage id="ui.configurator.summary.totalPrice" />
                </Typography>

                <Typography variant="paragraph" className="font-bold">
                  {Formatter.formatPrice(sum)}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <footer className="sticky bottom-0 w-full flex justify-end px-6 items-center py-5 bg-white border-t border-border-main gap-x-2">
          <Button
            appearance="gradient-mono-green"
            className="min-w-40 text-center flex justify-center items-center"
            disabled={true}
            onClick={() => {}}
          >
            <FormattedMessage id="ui.configurator.summary.submit" />
          </Button>
        </footer>
      </div>
    </Modal>
  );
};

interface CartRowProps {
  title: string;
  imageUrl: string;
  count: number;
  price: number;
}

const CartRow: React.FC<CartRowProps> = ({ title, price, imageUrl, count }) => (
  <section className="flex items-center justify-between w-full rounded border border-gray-200 bg-white shadow-sm pr-5 overflow-hidden">
    <div className="flex gap-x-5 items-center">
      <img src={imageUrl} className="aspect-square max-h-20 object-cover" alt={title} />
      <Typography variant="h6" className="font-normal">
        {title}
      </Typography>
    </div>

    <div className="flex gap-x-11 items-center">
      <span className="font-thin">{count}</span>
      <span className="font-black">{Formatter.formatPrice(price)}</span>
    </div>
  </section>
);
