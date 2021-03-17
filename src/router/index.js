import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Saved from "../views/Saved.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Start",
        component: Home,
    },
    {
        path: "/Saved",
        name: "Saved",
        component: Saved,
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
