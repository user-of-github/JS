import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AnimatedPage, pagePaddings } from '@/components/AnimatedPage';
import { headerHeight } from '@/components/Header';
import { Button } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { cn } from '@/components/utils';
import { Routes } from '@/routes';

export const HomePage: React.FC = () => {
  return (
    <AnimatedPage
      className={cn(
        'select-none w-full flex flex-col overflow-y-auto h-fit max-h-none max-sm:py-10',
        pagePaddings,
        `min-h-[max(600px, calc(100vh-${headerHeight}px))]`
      )}
    >
      <div className="justify-between grid grid-cols-12 gap-x-5">
        <div className="flex flex-col w-full col-span-7 max-md:col-span-8 max-sm:col-span-full  max-md:max-w-full  flex-nowrap justify-center">
          <div className="flex flex-col gap-y-7">
            <div className="leading-[40px]">
              <Typography variant="h1" className="inline font-thin">
                <FormattedMessage id="ui.home.titleOrdinary" />
              </Typography>
              &nbsp;&nbsp;
              <Typography variant="h1" className="inline text-primary-600">
                <FormattedMessage id="ui.home.titlePrimary" />
              </Typography>
            </div>

            <Typography variant="paragraph-small" className="text-border-main-active text-md max-lg:text-md">
              <FormattedMessage id="ui.home.description" />
            </Typography>
          </div>

          <Link to={Routes.configurator} className="w-fit mt-16 max-sm:w-full">
            <Button appearance="gradient-mono-primary" className="text-xl max-sm:w-full max-sm:justify-center">
              <FormattedMessage id="ui.home.exploreButton" />
            </Button>
          </Link>

          <Link to={Routes.about} className="border-b border-b-1 border-gray-400 text-gray-500 w-fit text-sm mt-7">
            <FormattedMessage id="ui.home.settings" />
          </Link>
        </div>

        <div className="col-span-5 max-md:col-span-4 w-full flex justify-end max-sm:hidden">
          <Icon iconName="mainPicture" className="stroke-primary-700 fill-primary-50 w-[90%] opacity-50 max-md:w-full" />
        </div>
      </div>
    </AnimatedPage>
  );
};
