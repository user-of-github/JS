import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DatasetService } from '@/core/services/DatasetService';
import { Formatter } from '@/core/services/Formatter';
import type { Product } from '@/core/types/domain/Product';
import { localization } from '@/stores/Localization';
import { ProductCard } from '@/components/ProductCard';
import { Button, ValueSelector } from '@/components/ui';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { Typography } from '@/components/ui/Typography';

interface CatalogModalProps {
  opened: boolean;
  onChoose: (product: Product) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({ opened, onClose, onChoose, isLoading }) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    setSelectedProduct(null);
  }, [opened]);

  const products = DatasetService.products;

  return (
    <Modal
      opened={opened}
      className="fixed top-0 left-0 right-0 bottom-0 bg-white w-full h-dvh overflow-y-auto flex flex-col justify-between"
    >
      <div className="relative">
        <header className="sticky top-0 flex w-full justify-between items-center py-6 px-6 bg-white border-b border-border-main">
          <Typography variant="h3">
            <FormattedMessage id="ui.configurator.catalog.title" />
          </Typography>

          <Button
            className="text-xl leading-[12rem] rounded p-0 w-12 h-12 flex items-center justify-center"
            onClick={onClose}
            appearance="gradient-mono-red"
          >
            &times;
          </Button>
        </header>

        <Tabs
          className="bg-white w-full p-7 flex flex-col gap-5"
          selectedTabClassName="border-b-solid border-b-2 border-b-primary-700 !text-primary-700"
        >
          <TabList className="flex !border-b !border-b-1 !border-border-main select-none">
            {products.map((item) => (
              <Tab key={item[0]} className="transition-colors cursor-pointer py-2 px-3 text-gray-600">
                <Typography variant="paragraph" className="font-medium">
                  <FormattedMessage id={`data.category.${item[0]}`} />
                </Typography>
              </Tab>
            ))}
          </TabList>

          {products.map((item) => (
            <TabPanel key={item[0]}>
              <ValueSelector
                name="catalog-product-selector"
                options={item[1]}
                selected={selectedProduct}
                onSelect={(product) => setSelectedProduct(product)}
                renderFunction={(value, isSelected) => (
                  <ProductCard
                    className={isSelected ? 'outline-2 outline-green-700 hover:outline-green-700' : ''}
                    price={Formatter.formatPrice(value.price)}
                    title={localization.formatMessage(`data.product.${value.article}`)}
                    imageUrl={value.image}
                    description={Formatter.formatProductDimensions(value.dimensions)}
                    onDoubleClick={() => {
                      setSelectedProduct(value);
                      onChoose(value);
                    }}
                  />
                )}
                className="w-full max-h-full overflow-y-auto grid grid-cols-5 gap-1.5 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 2xl:grid-cols-6"
              />
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <footer className="sticky bottom-0 w-full flex justify-end px-6 items-center py-5 bg-white border-t border-border-main gap-x-2">
        {isLoading && <LoadingSpinner hideText />}
        <Button
          appearance="gradient-mono-green"
          className="min-w-40 text-center flex justify-center items-center"
          disabled={!selectedProduct || isLoading}
          onClick={() => selectedProduct && onChoose(selectedProduct)}
        >
          {!isLoading ? (
            <FormattedMessage id="ui.configurator.catalog.addToConfiguration" />
          ) : (
            <div className="flex items-center gap-x-1">
              <FormattedMessage id="ui.general.loading" />
            </div>
          )}
        </Button>
      </footer>
    </Modal>
  );
};
