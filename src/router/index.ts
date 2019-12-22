import Vue from 'vue';
import VueRouter, {Route, RouteRecord} from 'vue-router';

import User from "../Entities/User";
import doCookieOperation from "../helper/CookieHelper";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    meta: {deniedForAuth: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '/participant',
    name: 'participant',
    meta: {requiredAuth: true},
    component: () => import(/* webpackChunkName: "note" */ '../views/Participant.vue')
  }]
});

/**
 * Router middleware to validate auth user to access page
 */
router.beforeEach((to: Route, from: Route, next: Function) => {
  const user: User = doCookieOperation("session");

  const requiredAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.requiredAuth);
  const deniedForAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.deniedForAuth);

  if (requiredAuth && (!user || !user.token)) {
    return next({path: "/"});
  } else if (deniedForAuth && user) {
    return next({path: "/participant"});
  }

  return next();
});

export default router;


// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import User from "../Entities/User";
// import doCookieOperation from "../helper/CookieHelper";
// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'login',
//      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
//   },
//   {
//     path: '/participants',
//     name: 'participants',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Participants.vue')
//   },
//   {
//     path: '/form-participant',
//     name: 'form-participant',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/Form-Participant.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })



// export default router
