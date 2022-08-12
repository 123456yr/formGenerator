import { ElInput } from 'element-plus'

const baseFieId = () => ({
  labelWidth: null,
  showLabel: true,
  span: 24,
  required: true,
  defaultValue: undefined,
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
      component: ElInput
    },
    __slot__: {
      prepend: '', // 前置内容
      append: '' // 后置内容
    },
    __props__: {
      type: 'text',
      moduleValue: '',
      maxLength: null,
      minLength: null,
      'show-word-limit': false,
      placeholder: '',
      clearable: false,
      disabled: false,
      size: 'default',
      'perfix-icon': '',
      'suffix-icon': '',
      readonly: false,
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
    __slots__: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]
    }
  }
]