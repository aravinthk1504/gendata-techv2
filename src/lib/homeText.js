/** Read already-loaded Next.js dictionaries without a client i18n runtime. */
export function homeText(dictionary, key, variables = {}) {
  const result = key.split(".").reduce((value, part) => value?.[part], dictionary)
  if (typeof result !== "string") return result ?? key
  return result.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => variables[name] ?? match)
}

export function localizedHref(lang, path = "/") {
  const locale = lang === "de" ? "de" : "en"
  if (!path || path === "/") return `/${locale}`
  if (path.startsWith("#")) return path
  if (/^(?:https?:|mailto:|tel:)/i.test(path)) return path
  if (/^\/(?:en|de)(?:\/|$)/.test(path)) return path
  return `/${locale}${path.startsWith("/") ? path : "/" + path}`
}
