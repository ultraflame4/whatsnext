import { createApp } from 'vue'
import {createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw} from "vue-router";
import "./assets/index.scss"

import App from "./App.vue";
import Calendar from "./views/Calendar.vue"

const routes:RouteRecordRaw[] = [
    {path:"/",redirect:"/calendar"},
    {path:"/calendar",component:Calendar}
]




const router = createRouter({
    history: createWebHashHistory(),
    routes
})



createApp(App)
    .use(router)
    .mount('#app')
