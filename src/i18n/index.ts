import sk from './sk.json';
import en from './en.json';
import pl from './pl.json';
import hu from './hu.json';
import de from './de.json';
import uk from './uk.json';

export const languages = {
  sk: 'Slovenčina',
  en: 'English',
  pl: 'Polski',
  hu: 'Magyar',
  de: 'Deutsch',
  uk: 'Українська',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'sk';
export const locales = Object.keys(languages) as Lang[];

export type Translation = typeof sk;

const translations: Record<Lang, Translation> = { sk, en, pl, hu, de, uk };

export function useTranslations(lang: Lang): Translation {
  return translations[lang];
}

export function localePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}
