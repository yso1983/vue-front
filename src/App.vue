<template>
  <v-app id="app">
    <main-leftmenu v-if="user" />
    <main-header v-if="user" />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <main-footer v-if="user" />
  </v-app>
</template>

<script>
//1. vue, 및 vue-router 를 import 후 Vue.use(VueRouter) 합니다.
import Vue from "vue";
//import VueRouter from "vue-router";
import Vuex from "vuex";

import MainLeftMenu from "./shared-components/MainLeftMenu.vue";
import MainHeader from "./shared-components/MainHeader.vue";
import MainFooter from "./shared-components/MainFooter.vue";

Vue.use(Vuex);

//5. 생성한 Router를 생성한 app에 주입 합니다.
export default {
  name: "App",
  components: {
    "main-header": MainHeader,
    "main-footer": MainFooter,
    "main-leftmenu": MainLeftMenu,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    //&&  this.$store.getters.user == null
    if (!this.$route.path.includes("login")) {
      this.$axios
        .get("/api/auth/signin")
        .then((res) => {
          const user = res.data.data;
          if (user) {
            this.$store.dispatch("SET_USER", user);
          } else {
            this.$router.push({
              name: "LoginPage",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
</script>
