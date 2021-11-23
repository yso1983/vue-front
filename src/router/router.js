import Vue from 'vue';
import VueRouter from 'vue-router';
import dashbord from "../views/dashbord";
import chart from "../views/chart";
import cate from "../views/cate";
//import Page1 from "../components/Page1";

//2.Route 에서 사용 할 Component 정의
Vue.use(VueRouter);

//3. Route 를 정의 합니다.
const routes = [
  {
    path: "/Home",
    name: "Home",
    component: dashbord,
  },
  {
    path: "/Chart",
    name: "Chart",
    component: chart,
  },
  {
    path: "/Cate",
    name: "Categori",
    component: cate,
  },
  { path: "*", redirect: "/Home" },
];

//4. 정의한 routes로 Router instance를 생성 합니다.
let router = new VueRouter({
  routes,
});

export default router;