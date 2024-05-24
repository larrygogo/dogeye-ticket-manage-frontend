import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import routes from "../config/routes.ts";
import {createRouter, createWebHistory} from "vue-router";
import 'element-plus/dist/index.css';
import './style.css';

const importComponent = (componentPath: string[]) => {
  const component = ["./pages", ...componentPath]
    .filter(item => item !== "")
    .join("/")
  return () => import(
    /* @vite-ignore */
    `./${component}.vue`
    )
}

const mapRoute = (route: any) => {
  const {path, component, routes, redirect, wrappers, name, icon} = route
  return {
    path,
    component: importComponent(component.split("/")),
    routes: routes?.map(mapRoute),
    redirect,
    wrappers,
    name,
    icon
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes?.map(mapRoute)
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')