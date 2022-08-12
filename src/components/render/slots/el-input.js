
export default {
  prepend(h, conf, key) {
    return h('template', this.$slots.prepend, conf.__slots__[key])
  },
  append(h, conf, key) {
    return h('template', this.$slots.append, conf.__slots__[key])
  }
}