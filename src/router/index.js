import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 路由push报错 处理
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
    component: () => import("views/Chart.vue"),

  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("views/Profile.vue")
  },
  {
    path: "/billing",
    name: 'billing',
    component: () => import("views/Billing.vue"),
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
