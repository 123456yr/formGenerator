import { ElOption } from 'element-plus'

export default {
  options(h, conf, key) {
    let options = conf.__slots__[key] || []
    return options.map(opt => h(ElOption, { label: opt.label, value: opt.value, key: opt.value }))
  }
}