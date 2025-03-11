import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AnimatedPage } from '@/components/AnimatedPage';
import { Button } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';
import { Routes } from '@/routes';

export const NotFoundLayoutPage: React.FC = () => (
  <AnimatedPage className="flex flex-col items-center w-full h-full justify-center">
    <div className="flex flex-col gap-y-5 px-10">
      <Typography variant="h1">
        <FormattedMessage id="ui.configurator.notFoundLayoutTitle" />
      </Typography>

      <Typography variant="paragraph" className="max-w-1/2">
        <FormattedMessage id="ui.configurator.notFoundLayoutText" />
      </Typography>

      <Link to={Routes.configurator}>
        <Button appearance="flat-dark">
          <FormattedMessage id="ui.configurator.goToLayoutsList" />
        </Button>
      </Link>
    </div>
  </AnimatedPage>
);
