import "server-only"

const dictionaries = {
  en: () =>
    import("./locales/en/common.json").then(
      (module) => module.default
    ),

  de: () =>
    import("./locales/de/common.json").then(
      (module) => module.default
    ),
}

export async function getDictionary(lang) {
  const loader = dictionaries[lang]

  if (!loader) {
    throw new Error(`Unsupported language: ${lang}`)
  }

  return loader()
}