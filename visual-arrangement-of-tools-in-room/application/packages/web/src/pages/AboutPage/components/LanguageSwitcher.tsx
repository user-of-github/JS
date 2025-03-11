import React from 'react';
import { observer } from 'mobx-react-lite';
import { LOCALES, LOCALE_TITLES, localization } from '@/stores/Localization';
import { ValueSelector } from '@/components/ui';
import { cn } from '@/components/utils';

export const LanguageSwitcher: React.FC<{ className?: string }> = observer(({ className }) => {
  return (
    <ValueSelector
      name="localization"
      options={LOCALES}
      selected={localization.locale}
      onSelect={localization.changeLanguage.bind(localization)}
      renderFunction={(value, isSelected) => <span className={cn(isSelected && 'underline')}>{LOCALE_TITLES[value]}</span>}
      className={className}
    />
  );
});
