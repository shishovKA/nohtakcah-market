import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Cart from "../views/Cart.vue"
import Saved from "../views/Saved.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Start",
        component: Home,
    },
    {
        path: "/Cart",
        name: "Cart",
        component: Cart,
    },
    {
        path: "/Saved",
        name: "Saved",
        component: Saved,
    },
]

const router = new VueRouter({
    routes,
})

export default router
