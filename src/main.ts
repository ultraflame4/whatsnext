import {createApp} from 'vue'
import {createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw} from "vue-router";
import "./assets/index.scss"

import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue"
import Login from "./views/Login.vue"
import Board from "./components/Board.vue"
import Empty from "./views/Empty.vue"
import {setRouter} from "./others";
import apiManager from "./apis/apiManager";

const routes: RouteRecordRaw[] = [

    {path: "/", redirect: "/login"},
    {path: "/login", component: Login},
    {
        path: "/dashboard",
        component: Dashboard,
        children: [
            {
                path:"board",
                component: Board,
            },
            {
                path:"calendar",
                component: Empty,
            },
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.path!=="/login"){
        if (apiManager.isAuthorised()){
            next()
        }
        else{
            next({
                path:"/login"
            })
        }
    }
    else{
        next()
    }

})

setRouter(router)
apiManager.start()
const app = createApp(App)

app.use(router)
    .mount('#app')

