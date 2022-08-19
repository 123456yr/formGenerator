/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-18 16:43:22
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-19 17:15:22
 * @FilePath: \formGenerator\src\components\render\rightRender.js
 * @Description: 
 */
import { h, ref } from 'vue'
import rightConf from '@/utils/rightConf'
import { ElButton, ElCol, ElDialog, ElFormItem, ElRow, selectV2InjectionKey } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
console.log(ElementPlusIconsVue, 'ElementPlusIconsVue')
// 缓存组件的配置
let activeMap= new WeakMap()
// 当前组件
let activeCom
// 图标组件数组，当前选中图标
let iconModules, activeIcon
/**
 * @description: 根据当前组件配置的props,返回需要的组件
 * @param {*} currentConfig
 * @return {*}
 */
export default function createComByConfig(com){
  activeCom= com
  let activeConfig= activeMap.get(activeCom)
  console.log(activeConfig, '0990')
  if(!activeConfig){
    let arr= [], {__props__: {type}, __config__: {tag}} = activeCom
    for(let key in __config__){
      if(rightConf[key]){
        arr.push(createSingleCom(rightConf[key], key, '__config__'))
      }
    }
    for(let key in __props__){
      if(rightConf[key]){
        arr.push(createSingleCom(rightConf[key], key, '__props__'))
      }
    }
    // 如果是文本框组件，加上两个插槽
    if(tag === 'el-input' && type === 'text'){
      arr.push(createSingleCom(rightConf[key], 'prepend', '__slot__'))
      arr.push(createSingleCom(rightConf[key], 'append', '__slot__'))
    }
  }
  
}
/**
 * @description: 根据rightConf中配置的组件特征config，转换成vnode,把初始值value放进去
 * 没有showMode就根据type类型判断使用的组件，有就用showMode
 * @param {*} config
 * @param {*} activeCom 当前组件是代理对象
 * @param {*} key 当前属性
 * @return {*}
 */
function createSingleCom(config, key, objName){
  console.log(config, 'config', value)
  let {type, label}= config,
    span= config.span || 24,
    children
  if(type.name === 'ElInput'){
    let obj= {
      onInput: (val) => {
        activeCom[objName][key]= val
      }
    }
    if(key.endsWith('-icon')){
      // 打开一个弹框 选择图标
      let children= getIconModules(),
          dialog= customDialog(children),
          dialogVisible= ref(false)
      const selectIcon= () => {
        dialogVisible= true
        activeCom[objName][key]= activeIcon
      }
      const footer= {footer: () => h(ElButton, {onClick: selectIcon()}, '确定')}
      obj.onFocus= () => dialogVisible.value= true
    }
    // 插槽和children怎么同时显示----------
    h(type, obj, activeCom[objName][key])
  }

  h(ElFormItem, {label}, h(ElRow, null, h(ElCol, {span}, children)))

}
/**
 * @description: 一个弹框组件
 * @param {*} children
 * @return {*}
 */
function customDialog(children){
  return {
    props: ['dialogVisible'],
    emits: ['closeDialog'],
    render(){
      h(ElDialog, {modelValue: this.props.dialogVisible, title: '请选择', width: '500px'}, children)
    }
  }
}
/**
 * @description: 图标组件vnode
 * @return {*}
 */

function getIconModules(){
  if(!iconModules){
    iconModules=  h(div, null, ElementPlusIconsVue.map(item => {
                    h(span, {class: activeIcon.name === item.name ? 'activeIcon' : '', onClick: () => activeIcon = item}, item)
                  }))
  }
  return iconModules
}



