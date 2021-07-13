import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const orginPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return orginPush.call(this, location).catch(error => error);
}
const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("views/Home.vue"),
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import("views/Charts.vue")
  },
  {
    path: '/news',
    name: 'news',
    component: () => import("views/News.vue")
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("views/Profile.vue")
  },
  {
    path: "/bill",
    component: () => import("views/Bill.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
