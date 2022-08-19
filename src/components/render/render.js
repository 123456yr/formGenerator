/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-12 17:48:25
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-19 10:19:24
 * @FilePath: \formGenerator\src\components\render\render.js
 * @Description: 
 */

import { ElCol, ElForm, ElFormItem, ElRow } from 'element-plus';
import { cloneDeep } from 'lodash';
import { h, reactive, withModifiers } from 'vue';

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
 * @description: 整理props中的事件：onInput: (val) => props.modelValue= val 
 * @param {*} props
 * @return {*}
 */
function getComEvent(com, props){
  let eventNames= Object.keys(props).filter(prop => {
    let reg= /^on[A-Z]{1}[a-z]+$/
    return reg.test(prop)
  })
  let events= eventNames.reduce((obj, key) => {
    obj[key]= (val) => {
      com.__props__.modelValue = val
    }
    return obj
  }, {})
  return {...props, ...events}
}
/**
 * @description:  将组件config 组装成 真实组件
 * @param {*} com
 * @return {*}
 */
export default function renderCom(com){
  // 这里的currentCom不是响应式的，com是响应式
  // let currentCom= cloneDeep(com)
  let { __config__: { component, span, label, prop , tag}, __slots__: slots, __children__: children, __props__: props } = com

  if (component) {
    let newChildren= slots ? getSlotsContent(com) : children?.length ? getChildContent(com) : null
    // return h(tag, getComEvent(com, props), newChildren)
    // 输入输出更新时 只渲染当前组件
    return {
      emits: ['activeItem'],
      render() {
        return h(ElRow, null, h(ElCol, {span, onClick: withModifiers(() => {this.$emit('activeItem', com)}, ['stop', 'prevent'])}, h(ElFormItem, {label, prop}, h(component, getComEvent(com, props), newChildren))))
      }
    }
  }
}
/**
 * @description: 将组件config 组装成 真实组件
 * @param {*} com
 * @return {*}
 */
// export default function renderComList(comList) {
//   console.log(comList, '全部的组件')
//   return comList.reduce((arr, com) => {
//     arr.push(renderCom(com))
//     return arr
//   }, [])
// }