import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AnimatedPage } from '@/components/AnimatedPage';
import { Button } from '@/components/ui';
import { Typography } from '@/components/ui/Typography';

const reloadPage = (): void => window.location.reload();

export const ErrorPage: React.FC = () => {
  return (
    <AnimatedPage className="h-dvh w-full bg-primary-700 flex justify-center items-center flex-col gap-y-10">
      <Typography variant="h1" className="text-white">
        <FormattedMessage id="ui.general.errorPageTitle" />
      </Typography>

      <div className="flex items-center gap-x-5">
        <Button appearance="flat-dark" onClick={reloadPage}>
          <FormattedMessage id="ui.general.refresh" />
        </Button>
        <Link to="/">
          <Button appearance="flat-dark">
            <FormattedMessage id="ui.general.goToHomePage" />
          </Button>
        </Link>
      </div>
    </AnimatedPage>
  );
};
