<!--
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-18 15:29:17
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-18 16:22:15
 * @FilePath: \formGenerator\src\views\test.vue
 * @Description: 
-->
<script setup>
import { cloneDeep } from 'lodash-es'
import { ref, reactive, computed, h } from 'vue'
let comList= reactive([
  {config: {tag:'input', tagContent: 'text', label: '文本框'}, prop: {placeholder: '请输入文本', value: ''}},
  {config: {tag:'input', tagContent: 'password', label: '密码框'}, prop: {placeholder: '请输入密码', value: ''}},
])
let comConfList= reactive([])
let trueComList= computed(() => {
  console.log('comConfList改变更新trueComList')
  return renderComList(comConfList)
})
function changeComList(){
  comList.push({config: {tag:'input', tagContent: 'password', label: '多行文本框'}, prop: {placeholder: '请输入密码', value: ''}})
}
function renderComList(comConfigs){
  console.log('render入口')
  let arr= []
  for(let item of comConfigs){
    let {config: {tag, tagContent, label}, prop: {placeholder, value}}= item
    arr.push(h(tag, {value, type: tag, placeholder, onInput: (evt) => {
      item.prop.value= evt.target.value
    }}))
  }
  return arr
}
// 深克隆 拖拽过来的组件
function cloneCom(original){
  return cloneDeep(original)
}
</script>

<template lang="pug">
div
  div.pullContainer
    draggable.list-group(
      :list='comList',
      :group='{ name: "comConfig", pull: "clone", put: false, revertClone: true }',
      :clone='cloneCom',
      itemKey='config.label',
    )
      template(#item='{ element, index }')
        el-button(type='primary') {{ element.config.label }}
  div.dragContainer
    draggable.dragList(
      :list='comConfList',
      group='comConfig',
      itemKey='config.label',
    )
      template(#item='{ element, index }')
        component(:is='trueComList[index]')
</template>
<style scoped>
.pullContainer{
  height: 300px;
  border: 1px solid #ddd;
}
.dragContainer{
  height: 500px;
  border: 1px solid #ccc;
}
</style>