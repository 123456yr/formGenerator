/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-17 14:24:13
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-19 14:16:17
 * @FilePath: \formGenerator\src\utils\rightConf.js
 * @Description: 
 */

import { ElButton, ElInput, ElInputNumber, ElSwitch } from "element-plus";

export default {
  label: {label: '标签', type: ElInput},
  prop: {label: '字段名称', type: ElInput},
  placeholder: {label: '占位文本', type: ElInput},
  clearable: {label: '是否可清空', type: ElSwitch},
  disabled: {label: '是否禁用', type: ElSwitch},
  readonly: {label: '是否只读', type: ElSwitch},
  'prefix-icon': {label: '自定义前缀图标', type: ElInput, origin: null, event: 'onFocus'},
  'suffix-icon': {label: '自定义后缀图标', type: ElInput, origin: null, event: 'onFocus'},
  prepend: {label: '前置内容', type: ElInput},
  append: {label: '后置内容', type: ElInput},
  'show-word-limit': {label: '是否显示输入字数', type: ElInputNumber},
  'maxlength': {label: '最大长度', type: ElInputNumber},
  size: {label: '尺寸', type: ElButton, span: 8, sizes: ['small', 'default', 'large']},
  
}