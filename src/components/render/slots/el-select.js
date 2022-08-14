/*
 * @Author: 2197192973@qq.com yangrui
 * @Date: 2022-08-13 09:47:05
 * @LastEditors: 2197192973@qq.com yangrui
 * @LastEditTime: 2022-08-14 12:14:03
 * @FilePath: \formGenerator\src\components\render\slots\el-select.js
 * @Description: 
 */
import { ElOption } from 'element-plus'

function getOptions(h, conf) {
  let options = conf.__children__ || []
  return options.map(opt => h(ElOption, { label: opt.label, value: opt.value, key: opt.value }))
}

export default getOptions