import Vue from 'vue'
// import Cookies from 'js-cookie'
import App from './App.vue'
import router from './router'
// import User from './Entities/User'
import doCookieOperation from './helper/CookieHelper';
import Notification from 'vue-notification';

Vue.config.productionTip = false

// Kamu juga bisa membuat methods dengan Vue.prototype
Vue.prototype.$doCookieOperation = doCookieOperation;

// Menggunakan vue-notification
Vue.use(Notification);

const app = new Vue({
  router,
  render: h => h(App),
  // methods: { doCookieOperation }
});



// const app = new Vue({
//   router,
//   render: h => h(App),
//   // created() {
//   //   // Get cookies
//   //   console.log(this.doCookieOperation("session", {}));
//   // },
//   methods: {
//     // parameter value dengan "?" akan menjadikannya opsional
//     doCookieOperation(key: string, value?: any): void | null | User {
//       if (value) {
//         return Cookies.set(key, JSON.stringify(value));
//       }

//       return Cookies.get(key) ? JSON.parse(Cookies.get(key) as any) : null;
//     }
//   }
// })

app.$mount('#app');