<template>
  <v-app id="app">
    <main-leftmenu v-if="currentUser" />
    <main-header v-if="currentUser" />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <message-dialog />
    </v-main>
    <main-footer v-if="false" />
  </v-app>
</template>
<style>
html {
  overflow-y: auto;
}
</style>

<script>
//1. vue, 및 vue-router 를 import 후 Vue.use(VueRouter) 합니다.
import Vue from "vue";
//import VueRouter from "vue-router";
import Vuex from "vuex";

import MainLeftMenu from "./shared-components/MainLeftMenu.vue";
import MainHeader from "./shared-components/MainHeader.vue";
import MainFooter from "./shared-components/MainFooter.vue";
import Dialog from "./views/Dialog.vue";

Vue.use(Vuex);

//5. 생성한 Router를 생성한 app에 주입 합니다.
export default {
  name: "App",
  components: {
    "main-header": MainHeader,
    "main-footer": MainFooter,
    "main-leftmenu": MainLeftMenu,
    "message-dialog": Dialog
  },
  computed: {
    currentUser() {
      //console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "LoginPage" });
    },
  },
  mounted() {
    if(!this.$route.path.includes('login')){
      if (this.currentUser) {
        this.$store
          .dispatch("auth/check")
          .then(
            (res) => {
              if (res == "0000" || res == "3100") {
                if (res == "3100") {
                  this.$store.dispatch("auth/refresh").then(
                    () => {
                      console.log('refresh token!');
                    },
                    (error) => {
                      this.logout();
                    }
                  );
                }
              } else {
                this.logout();
              }
            },
            (error) => {
              this.logout();
            }
          )
          .catch((err) => alert(err.message));
      } else {
        this.$router.push({ name: "LoginPage" });
      }
    }
  },
};
</script>
