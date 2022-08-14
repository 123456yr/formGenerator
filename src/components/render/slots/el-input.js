
export default {
  prepend(h, conf, key) {
    return {perpend: () => conf.__slots__[key]}
  },
  append(h, conf, key) {
    return {append: () => conf.__slots__[key]}
  }
}