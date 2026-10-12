import "server-only"

const homeDictionaries = {
  en: () => import("./locales/en/home.json").then((module) => module.default),
  de: () => import("./locales/de/home.json").then((module) => module.default),
}

export async function getHomeDictionary(lang) {
  const load = homeDictionaries[lang]
  if (!load) throw new Error(`Unsupported language: ${lang}`)
  return load()
}
