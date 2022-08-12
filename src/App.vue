
<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { reactive, ref } from 'vue';
import {inputComponents, selectComponents} from './utils/config'
let comList= reactive([
  {label: '输入型组件', comArr: inputComponents}, 
  {label: '选择型组件', comArr: selectComponents}
])
let trueComList= reactive([])
const textContent= ref('999')
function pullCom(evt){
  console.log(evt, 'pullCom')
  trueComList.push(evt.moved.element)
}
function putCom(evt){
  console.log(evt, 'putCom', trueComList)
  let time= Date.now()
  console.log(time, 'time');
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
        :list='trueComList',
        group='comConfig',
        itemKey='__config__.label',
        @change='putCom'
      )
        template(#item='{ element, index }')
          div {{ element.__config__.label }}
  .right
    .header 右面板 {{ textContent }}
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
