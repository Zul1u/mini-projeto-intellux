export const SUPPORTED_LANGS = ['pt-BR', 'en-US', 'es'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
