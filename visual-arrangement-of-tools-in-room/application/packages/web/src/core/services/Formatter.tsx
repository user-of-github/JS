import React from 'react';
import { DatasetService } from '@/core/services/DatasetService';
import type { Dimensions } from '@/core/types/domain/Dimensions';
import { Locale, localization } from '@/stores/Localization';

export class Formatter {
  private static integerFormatter = Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0
  });

  private static fractionFormatter = Intl.NumberFormat('en-Gb', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  private static wholeNumberFormatterWithFixedLength = Intl.NumberFormat('ru-RU', {
    maximumSignificantDigits: 3,
    minimumSignificantDigits: 3,
    signDisplay: 'exceptZero'
  });

  public static formatInteger(value: number): string {
    return Formatter.integerFormatter.format(value);
  }

  public static formatFraction(value: number): string {
    return Formatter.fractionFormatter.format(value);
  }

  public static formatWholeNumber(value: number): string {
    return this.wholeNumberFormatterWithFixedLength.format(value);
  }

  public static formatProductDimensions(dimensions: Dimensions): React.ReactNode {
    const unit = localization.formatMessage('ui.units.cm');
    const length = `${Formatter.fractionFormatter.format(dimensions.length)} ${unit}`;
    const width = `${Formatter.fractionFormatter.format(dimensions.width)} ${unit}`;
    const height = `${Formatter.fractionFormatter.format(dimensions.height)} ${unit}`;

    return (
      <span title={localization.formatMessage('ui.units.shortageAll')}>
        {length} × {width} × {height}
      </span>
    );
  }

  public static toLocalDateString(source: any): string {
    const accordance: Record<Locale, string> = {
      [Locale.en]: 'en-Gb',
      [Locale.ru]: 'ru-Ru'
    } as const;

    return new Date(source).toLocaleString(accordance[localization.locale]);
  }

  public static formatPrice(source: number): string {
    return `${Formatter.fractionFormatter.format(source)}\u00A0${DatasetService.currency}`;
  }
}
