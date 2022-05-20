import {createApp} from 'vue'
import {createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw} from "vue-router";
import "./assets/index.scss"

import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue"

const routes: RouteRecordRaw[] = [
    {path: "/", redirect: "/dashboard"},
    {
        path: "/dashboard",
        component: Dashboard,
        children: []
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const app = createApp(App)
app.use(router)
    .mount('#app')

app.config.globalProperties.$vroute = (path: string) => {
    let url = new URL(path);
    if (url.origin !== location.origin) {
        location.assign(url)
    } else {
        router.push(path)
    }
}