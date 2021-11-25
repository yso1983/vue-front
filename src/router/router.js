import Vue from "vue";
import VueRouter from "vue-router";
import Dashbord from "../views/Dashbord";
import Chart from "../views/Chart";
import Cate from "../views/Cate";
import Account from "../views/Account";
import Login from "../views/Login";
import Dnw from "../views/Dnw";

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
    name: "Deposit&Withdrawal",
    component: Dnw,
  },
  { path: "*", redirect: "/Home" },
];

//4. 정의한 routes로 Router instance를 생성 합니다.
let router = new VueRouter({
  routes,
});

export default router;