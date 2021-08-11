import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from "views/Home.vue"
import Charts from "views/Charts"
import News from "views/News"
import Profile from "views/Profile"
// import Bill from "views/Bill"
// import BillOut from 'views/BillOut'
// import BillIn from 'views/BillIn'


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
    // component: Home,
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import("views/Charts.vue"),
    // component: Charts,
    // children: [
    //   {
    //     path: "line",
    //     component: () => import("views/ChartsLine")
    //   },
    //   {
    //     path: "pie",
    //     component: () => import("views/ChartsPie")
    //   }
    // ]
  },
  {
    path: '/news',
    name: 'news',
    component: () => import("views/News.vue")
    // component: News,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("views/Profile.vue")
    // component: Profile
  },
  {
    path: "/billing",
    name: 'billing',
    component: () => import("views/Billing.vue"),
    // component: Bill,
    // children: [
    //   {
    //     path: "",
    //     redirect: "/bill/billout"
    //   },
    //   {
    //     path: "billin",
    //     // component: () => import("views/BillIn")
    //     component: BillIn
    //   },
    //   {
    //     path: "billout",
    //     // component: () => import("views/BillOut")
    //     component: BillOut
    //   }
    // ]
  },
  {
    path: "/editing",
    name: "editing",
    component: () => import("views/Editing.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
console.log(router)
router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
})

export default router
