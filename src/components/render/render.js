/*
 * @Author: 2197192973@qq.com yangrui
 * @Date: 2022-08-13 09:47:05
 * @LastEditors: 2197192973@qq.com yangrui
 * @LastEditTime: 2022-08-14 12:29:32
 * @FilePath: \formGenerator\src\components\render\render.js
 * @Description: 
 */

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
//       onInput: (evt) => {}
//     })
//   }
// }


/**
 * @description: 根据__slots__ 找到components/render/slots/下对应文件名的文件 返回内容 作为 children
 * webpack: const slotsFiles= require.context('./slots', false, /\.js$/); 
 * vite: import.meta.glob
 * @return {*}
 */
const slotsFiles= import.meta.glob('./slots/*.js')
let slotsContent={}
for(let key in slotsFiles){
  let {default: myDefault}= await slotsFiles[key]()
  // let attr1= key.match(/\/([\w-]+)\.js/)
  let attr= key.replace(/\.\/slots\/([\w-]+)\.js/, '$1')
  slotsContent[attr]= myDefault
}
/**
 * @description: h的第三个参数,如果是slots，则为对象{perpend: () => '', append: () => ''}
 * @param {*} tag
 * @param {*} slots
 * @return {*}
 */
function getSlotsContent(com){
  let slotObj= {},  {__config__: {tag}, __slots__: slots}= com
  for(let key in slots){
    if(slots[key]){
      slotObj[key]= slotsContent[tag][key](h, com, key)
    }
  }
  return slotObj
}
/**
 * @description: 获取vnode的children
 * @param {*} com
 * @return {*}
 */
function getChildContent(com){
  let {__config__: {tag}}= com
  return slotsContent[tag](h, com)
}

/**
 * @description: 将组件config 组装成 真实组件
 * @param {*} com
 * @return {*}
 */
export default function render(com) {
  let { __config__: { component }, __slots__: slots, __children__: children, __props__: props } = com
  if (component) {
    let newChildren= slots ? getSlotsContent(com) : children?.length ? getChildContent(com) : null
    return h(component, props, newChildren)
  }
}