import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { animatedComponentProperties } from '@/components/AnimatedPage';
import { headerHeight } from '@/components/Header';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { cn } from '@/components/utils';
import { Routes } from '@/routes';
import styles from './SideBarLayout.module.css';

interface SideBarLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export const sideBarAsPartOfGridProps = 'col-span-4 2xl:col-span-3';

export const SideBarLayout: React.FC<SideBarLayoutProps> = ({ children, className }) => (
  <motion.aside
    {...animatedComponentProperties}
    className={cn(
      'flex flex-col relative overflow-auto w-full py-3 px-2 pt-5 border-r border-r-border-main max-h-full overflow-y-auto',
      `max-h-[calc(100vh-${headerHeight}px)] overflow-y-auto`,
      sideBarAsPartOfGridProps,
      styles.container,
      className
    )}
  >
    <Link to={Routes.configurator} className="border-b border-b-primary-100 px-1 text-primary-700 mb-5 pb-1 w-fit">
      ←&nbsp;&nbsp;
      <FormattedMessage id="ui.general.back" />
    </Link>
    {children}
  </motion.aside>
);

interface SideBarHeadingProps {
  title: string;
  onBackButtonClick: () => void;
}

export const SideBarHeading: React.FC<SideBarHeadingProps> = ({ title, onBackButtonClick }) => (
  <motion.div
    className="w-full flex items-center gap-x-2 py-1 pb-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <button
      className="outline-none bg-none rounded-full transition-colors p-1 border-1 hover:bg-primary-100"
      onClick={onBackButtonClick}
    >
      <Icon iconName="arrowLeft" width={25} />
    </button>
    <Typography variant="h6">{title}</Typography>
  </motion.div>
);
