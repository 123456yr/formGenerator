/*
 * @Author: yang.rui 2197192973@qq.com
 * @Date: 2022-08-12 17:48:25
 * @LastEditors: yang.rui 2197192973@qq.com
 * @LastEditTime: 2022-08-18 15:32:56
 * @FilePath: \formGenerator\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/test', component: () => import('@/views/test.vue')}
  ],
});

export default router;
