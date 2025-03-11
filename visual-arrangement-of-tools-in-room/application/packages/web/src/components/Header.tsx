import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';

export const headerHeight = 80; // just took from elements inspector

export const Header: React.FC = () => (
  <header className="w-full bg-primary-700 text-white py-3 px-5 flex justify-between items-center">
    <nav className="flex justify-start">
      <Link to="/" className="flex gap-x-4 items-center">
        <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center transition-transform active:scale-95">
          <Icon iconName="mainPicture" height={50} width={50} className="stroke-primary-700" />
        </div>
        <div className="flex flex-col">
          <Typography variant="h4">
            <FormattedMessage id="ui.header.title" />
          </Typography>
          <Typography variant="paragraph-small">
            <FormattedMessage id="ui.header.subtitle" />
          </Typography>
        </div>
      </Link>
    </nav>
  </header>
);
