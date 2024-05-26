import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import routes from "../config/routes.ts";
import {createRouter, createWebHistory} from "vue-router";
import 'element-plus/dist/index.css';
import './style.css';

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
  const {path, component, children, redirect, wrappers, name, icon} = route

  return {
    path,
    component: importComponent(
      [
        component && children ? "./layouts" : "./pages",
        ...component.split("/")
      ]
    ),
    children: children?.map(mapRoute),
    redirect,
    wrappers,
    name,
    icon
  }
}

console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes: routes?.map(mapRoute)
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')