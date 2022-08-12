import { ElInput } from 'element-plus';
import { h } from 'vue';


// export default {
//   props: {
//     modelValue: String
//   },
//   emits: ['update:modelValue'],
//   render() {
//     return h(ElInput, {
//       modelValue: this.modelValue,
//       onInput: (value) => this.$emit('update:modelValue', value)
//     })
//   }
// }

// 根据__slots__ 找到components/render/slots/下对应文件名的文件 返回内容 作为 children


// 将组件config 组装成 真实组件
function render(comList) {
  for (let com of comList) {
    let { __config__: { component }, __slots__: slots, __props__: props } = com
    if (component) {
      h(component, props,)
    }
  }
}