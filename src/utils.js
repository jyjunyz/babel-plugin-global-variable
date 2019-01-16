export function iskebabCase(str) {
  return str.indexOf('-')
}

export function kebabCase(str) {
  return str.replace(/[- _]+|([A-Z])/g, (whole, sub) => (sub ? '-' + sub.toLowerCase() : '-')).replace(/^-/, '').replace(/-+/g, '-')
}

export function camelCase(str) {
  return kebabCase(str).replace(/-([a-z])/g, (whole, ch) => ch.toUpperCase()).replace(/[A-Z]([a-z])([A-Z]|\b)/g, (whole, ch) => whole.toUpperCase())
}
