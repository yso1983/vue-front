<template>
  <v-app id="inspire">
    <main-leftmenu />
    <main-header />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <v-subheader v-if="$store.state.subtitle">{{ $store.state.subtitle }}</v-subheader>
        <router-view></router-view>
      </v-container>
    </v-main>
    <main-footer />
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
  }
};
</script>
