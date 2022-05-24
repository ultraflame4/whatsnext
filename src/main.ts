import {createApp} from 'vue'
import {createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw} from "vue-router";
import "./assets/index.scss"

import App from "./App.vue";
import Dashboard from "./views/Dashboard.vue"
import Login from "./views/Login.vue"
import Board from "./views/Board.vue"
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
                path: "",
                redirect:"/dashboard/board"
            },
            {
                path: "board",
                component: Board,
            },
            {
                path: "calendar",
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
    if (to.path !== "/login") {
        if (apiManager.isAuthorised()) {
            next()
        } else {
            next({
                path: "/login"
            })
        }
    } else {
        next()
    }

})

setRouter(router)
apiManager.start()
const app = createApp(App)

app.directive("draggable-item",{
    created:(el:HTMLElement, binding, vnode, prevVNode) => {
        let mouseDown = false
        let dragging = false
        let mouseDownX = 0
        let mouseDownY = 0
        function onMouseDown(ev:MouseEvent) {
            mouseDown=true
            mouseDownX=ev.clientX
            mouseDownY=ev.clientY
        }
        function onMouseUp() {
            mouseDown=false
            if (dragging){
                dragEnd()
            }
            dragging=false

        }
        const movementTriggerTreshold = 10
        function onMouseMove(ev:MouseEvent) {

            if (!mouseDown){
                return;
            }

            let deltaX = Math.abs(ev.clientX-mouseDownX)
            let deltaY = Math.abs(ev.clientY-mouseDownY)
            if (deltaX<movementTriggerTreshold&&deltaY<movementTriggerTreshold){
                return
            }
            console.log("a")
            if (mouseDown&&!dragging){
                dragging=true
                dragStart()
            }
        }
        function dragStart(){
            console.log("Start")
        }
        function onDragging(){
            console.log("Start")
        }
        function dragEnd(){
            console.log("End")
        }

        el.addEventListener("mousedown",onMouseDown)
        document.addEventListener("mouseup",onMouseUp)
        document.addEventListener("mousemove",onMouseMove)
    }
})

app.use(router)
    .mount('#app')

