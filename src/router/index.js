import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Saved from "../views/Saved.vue"

Vue.use(VueRouter)

const publicPath = process.env.NODE_ENV === "production" ? "/nohtakcah-market/" : "/";

const routes = [
    {
        path: publicPath,
        name: "Start",
        component: Home,
    },
    {
        path: publicPath+"Saved",
        name: "Saved",
        component: Saved,
    },
]

const router = new VueRouter({
    base: publicPath,
    mode: "history",
    routes,
})

export default router
