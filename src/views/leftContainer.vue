<!--
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-12 17:48:25
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-17 16:09:29
 * @FilePath: \formGenerator\src\views\leftContainer.vue
 * @Description: 
-->
<script>
console.log('=============')
</script>

<script setup>
console.log('9999999')
import { computed, reactive, watch } from 'vue';
let arrObj= reactive([{a: 1, b: 2}, {c: 3}])
let obj= computed({
  get: ()=> {
    console.log(arrObj, 'a00')
    let obj= {}
    for(let [item, index] of arrObj){
      obj[index]= item.keys()
    }
    return obj
  }
})
watch(arrObj, () => {
  console.log('更新了')
})
function handleClick(){
  // arrObj[0].a= 33
  arrObj.push({d: 6})
  console.log(arrObj, '---')
}
</script>

<template lang="pug">
.leftContainer
  el-button(@click='handleClick') 点击
</template>

<style scoped>
.comContent {
}
</style>