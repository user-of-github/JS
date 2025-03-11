import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localization } from '@/stores/Localization';
import { Typography } from '@/components/ui/Typography';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  hideText?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ hideText }) => (
  <div className="flex gap-x-2.5 items-center">
    {!hideText && <Typography variant="paragraph">{localization.formatMessage('ui.general.loading')}</Typography>}
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <ellipse
        rx="10"
        ry="10"
        fill="none"
        stroke="#3a3f45"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeDasharray="50"
        transform="translate(20,20)"
        className={styles.animated}
      />
    </svg>
  </div>
);
