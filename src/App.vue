
<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { reactive, ref } from 'vue';
import {inputComponents, selectComponents} from './utils/config'
import render from './components/render/render.js'
// import leftContainer from './views/leftContainer.vue'
// console.log(leftContainer)
let comList= reactive([
  {label: '输入型组件', comArr: inputComponents}, 
  {label: '选择型组件', comArr: selectComponents}
])
let comConfList= reactive([])
let trueComList= reactive([])
function pullCom(evt){
  console.log(evt, 'pullCom')
  comConfList.push(evt.moved.element)
}
function putCom(evt){
  console.log(evt, 'putCom', comConfList)
  // trueComList= render(comConfList)
  // console.log(trueComList)
}
</script>

<template lang="pug">
.container
  .left
    .header 左面板
    .leftContent(v-for='(com, index) of comList', :key='index')
      .leftHeader {{ com.label }}
      draggable.list-group(
        :list='com.comArr',
        :group='{ name: "comConfig", pull: "clone", put: false, revertClone: true }',
        itemKey='__config__.label',
        @change='pullCom'
      )
        template(#item='{ element, index }')
          el-button(type='primary') {{ element.__config__.label }}
  .middle
    .header 展示区
    .middleContainer 
      draggable.dragList(
        :list='comConfList',
        group='comConfig',
        itemKey='__config__.label',
        @change='putCom'
      )
        template(#item='{ element, index }')
          component(:is='render(element)')
  .right
    .header 右面板
</template>

<style scoped>
.middleContainer,
.dragList {
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.left,
.right {
  width: 300px;
  height: 100%;
  flex: 0 0 auto;
}
.header {
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(45, 45, 221, 0.315);
  background: rgba(64, 64, 197, 0.158);
}
.middle {
  height: 100%;
  flex: 1 1 auto;
  border-left: 1px solid rgba(45, 45, 221, 0.315);
  border-right: 1px solid rgba(45, 45, 221, 0.315);
}
</style>
