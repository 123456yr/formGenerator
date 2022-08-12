<script>
console.log('=============')
</script>

<script setup>
console.log('9999999')
import { reactive } from 'vue';
import {inputComponents, selectComponents} from '../utils/config'
// console.log(draggable, 'drag')
let comList= reactive([
  {label: '输入型组件', comArr: inputComponents}, 
  {label: '选择型组件', comArr: selectComponents}
])
</script>

<template lang="pug">
.leftContainer
  .leftContent(v-for='(com, index) of comList', :key='index')
    .header {{ com.label }}
    draggable.list-group(
      :list='com.comArr',
      group='comConfig',
      itemKey='__config__.label'
    )
      template(#item='{ element, index }')
        el-button(type='primary') {{ element.__config__.label }}
</template>

<style scoped>
.comContent {
}
</style>