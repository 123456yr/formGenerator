/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-12 17:48:25
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-19 14:18:00
 * @FilePath: \formGenerator\src\utils\config.js
 * @Description: 
 */
import { ElInput } from 'element-plus'

const baseFieId = () => ({
  labelWidth: null,
  span: 24,
  layout: 'colFormItem',
  regList: [] // 正则校验规则
})

// 输入型组件 
export const inputComponents = [
  {
    __config__: {
      ...baseFieId(),
      label: '单行文本',
      changeTag: true,
      tag: 'el-input',
      prop: 'modelValue',
      component: ElInput
    },
    __slot__: {
      prepend: '', // 前置内容
      append: '' // 后置内容
    },
    __props__: {
      type: 'text',
      modelValue: '',
      maxLength: null,
      'show-word-limit': false,
      placeholder: '单行文本',
      clearable: false,
      disabled: false,
      size: 'default',
      'perfix-icon': '',
      'suffix-icon': '',
      readonly: false,
      onInput: null
    }
  },
  {
    __config__: {
      ...baseFieId(),
      label: '密码框',
      changeTag: true,
      tag: 'el-input',
      component: ElInput,
    },
    __props__: {
      type: 'password',
      moduleValue: '',
      placeholder: '',
      clearable: false,
      disabled: false,
      size: 'default',
      'perfix-icon': '',
      'suffix-icon': '',
      readonly: false,
    }

  }
]

// 选择型组件
export const selectComponents = [
  {
    __config__: {
      ...baseFieId(),
      label: '下拉选择',
      tag: 'el-select',
      tagIcon: 'select',
    },
    __children__: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
    ],
    __props__: {
      modelValue: 1,
      onChange: (val) => {console.log(val, 'val')}
    }
  }
]