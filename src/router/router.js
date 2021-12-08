import Vue from "vue";
import VueRouter from "vue-router";
import Dashbord from "../views/Dashbord";
import Chart from "../views/Chart";
import Cate from "../views/Cate";
import Account from "../views/Account";
import Login from "../views/Login";
import Dnw from "../views/Dnw";
import autoDnw from "../views/AutomaticDnw";

//2.Route 에서 사용 할 Component 정의
Vue.use(VueRouter);

//3. Route 를 정의 합니다.
const routes = [
  {
    path: "/login",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Dashbord,
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/cate",
    name: "Cate",
    component: Cate,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/dnw",
    name: "D&W",
    component: Dnw,
  },
  {
    path: "/automaricDnw",
    name: "AutomaricD&W",
    component: autoDnw,
  },
  { path: "*", redirect: "/chart" },
];

//4. 정의한 routes로 Router instance를 생성 합니다.
//https://stackoverflow.com/questions/47655869/how-to-use-vue-js-with-nginx
let router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;