/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-17 09:51:25
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-17 09:57:38
 * @FilePath: \formGenerator\src\views\test.js
 * @Description: 
 */
import { h } from "vue"

export default {
  emits: ['activeItem'],
  render(){
    return h('div', {class: 'divDom', onClick: () => this.$emit('activeItem')}, '哈哈哈')
  }
}