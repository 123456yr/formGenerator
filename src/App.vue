
<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { computed, reactive, ref, shallowRef, watch , watchEffect} from 'vue';
import {inputComponents, selectComponents} from './utils/config'
import renderCom from './components/render/render.js'
import createComByConfig from '@/components/render/rightRender.js'
import { cloneDeep } from 'lodash-es';
let comList= reactive([
  {label: '输入型组件', comArr: inputComponents}, 
  {label: '选择型组件', comArr: selectComponents}
])
let comConfList= reactive([])
let activeCom
let ruleForm= reactive({})
// let trueComList= computed(() => {
//   console.log(comConfList, '---=-==--=')
//   return renderComList(comConfList)
// })

function pullCom(evt){
  // console.log(evt, 'pullCom')
}
function putCom(evt){
  // console.log(evt, 'putCom', comConfList)
}
// 深克隆 拖拽过来的组件
function cloneCom(original){
  return cloneDeep(original)
}
function activeItem(activeCom){
  console.log('当前组件---', activeCom, '-==-=', comConfList)
  activeCom= activeCom
  createComByConfig(activeCom)
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
        :clone='cloneCom',
        itemKey='__config__.label',
      )
        template(#item='{ element, index }')
          el-button(type='primary') {{ element.__config__.label }}
  .middle
    .header 展示区
    .middleContainer 
      el-form(ref='formRef', :model='ruleForm', label-width='120px')
        draggable.dragList(
          :list='comConfList',
          group='comConfig',
          itemKey='__config__.label',
        )
          template(#item='{ element, index }')
            component(:is='renderCom(element)', @activeItem='activeItem')
  .right
    .header 右面板
    .rightContainer 
      template(v-for='item of comConfigure')
        component(:is='item')
</template>

<style scoped>
.middleContainer,
.dragList,
.el-form {
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
.activeIcon{
  background: #c6e2ff;
}
</style>
