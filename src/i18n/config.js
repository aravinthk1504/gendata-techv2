export const languages = ["en", "de"]

export const defaultLanguage = "en"

export function isValidLanguage(lang) {
  return languages.includes(lang)
}