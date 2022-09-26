export const getUniqueId = (length = 16): string => {
  return Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', '')
}
