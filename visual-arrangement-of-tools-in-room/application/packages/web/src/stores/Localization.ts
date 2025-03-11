type RawLocaleMessages = Array<[string, string | RawLocaleMessages]>;

export enum Locale {
  en = 'en',
  ru = 'ru'
}

export const LOCALES: ReadonlyArray<Locale> = [Locale.ru, Locale.en] as const;

export const LOCALE_TITLES: Record<Locale, string> = {
  [Locale.ru]: 'Рус',
  [Locale.en]: 'Eng'
} as const;

class LocalizationProvider {
  private static readonly baseUrl = '/assets/i18n';
  public messages: Record<string, string> = {};

  public locale: Locale;

  public constructor(initialLocale: Locale) {
    this.locale = initialLocale;
  }

  public async init(): Promise<void> {
    const messages = await this.fetchTranslation();
    this.messages = Object.fromEntries(this.flattenTranslation(Object.entries(messages)));
  }

  public formatMessage(key: string): string {
    return this.messages[key];
  }

  public async changeLanguage(locale: Locale): Promise<void> {
    if (this.locale === locale) {
      return;
    }
    window.localStorage.setItem(localStorageLanguageKey, locale);
    window.location.reload();
  }

  private async fetchTranslation(): Promise<RawLocaleMessages | object> {
    const url = `${LocalizationProvider.baseUrl}/${this.locale}.json`;

    try {
      const rawResponse = await fetch(url);
      return (await rawResponse.json()) as RawLocaleMessages;
    } catch (error) {
      console.error(`Error in fetching translation for ${this.locale}`);
      console.error(error);
      return {};
    }
  }

  // TODO: maybe make an utility to prebuild this
  private flattenTranslation(messageEntries: Array<[string, string | object]>): Array<[string, string]> {
    return messageEntries.flatMap(([key, entry]) => {
      if (typeof entry === 'string') {
        return [[key, entry]];
      } else {
        return this.flattenTranslation(Object.entries(entry)).map(([innerKey, innerEntry]) => {
          return [`${key}.${innerKey}`, innerEntry];
        });
      }
    }) as Array<[string, string]>;
  }
}

const localStorageLanguageKey = 'visualArrangementOfObjectsLocale';

const currentLocale = window.localStorage.getItem(localStorageLanguageKey) || import.meta.env.VITE_APP__DEFAULT_LANGUAGE || Locale.en;

export const localization = new LocalizationProvider(currentLocale);
export type Localization = LocalizationProvider;
