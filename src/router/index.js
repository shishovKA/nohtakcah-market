import Vue from "vue";
import VueRouter from "vue-router";
import StartPage from "../views/StartPage.vue";
import Cart from "../views/Cart.vue";
import Saved from "../views/Saved.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Start",
        component: StartPage,
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
];

const router = new VueRouter({
    routes,
});

export default router;
