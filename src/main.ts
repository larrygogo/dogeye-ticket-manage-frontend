import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import routes from "../config/routes.ts";
import {createRouter, createWebHistory} from "vue-router";
import 'element-plus/dist/index.css';
import './style.css';
import {createPinia} from "pinia";
import VueECharts from "vue-echarts";
import * as echarts from "echarts"
import { use } from "echarts/core";

// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);

const importComponent = (componentPath: string[]) => {
  const component = componentPath
    .filter(item => item !== "")
    .join("/")
  console.log(component)
  return () => import(
    /* @vite-ignore */
    `./${component}.vue`
    )
}

const mapRoute = (route: any) => {
  const {path, component, children, meta} = route

  return {
    path,
    component: importComponent(
      [
        component && children ? "./layouts" : "./pages",
        ...component.split("/")
      ]
    ),
    children: children?.map(mapRoute),
    meta
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes?.map(mapRoute)
})
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.component("v-chart", VueECharts)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')