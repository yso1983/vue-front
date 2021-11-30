<template>
  <v-navigation-drawer v-model="$store.state.global.drawer" app>
    <!--  color="grey lighten-4" -->
    <v-sheet color="grey" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
      <div>Hi {{ currentUser.name }}</div>
    </v-sheet>
    <v-divider></v-divider>

    <v-card class="mx-auto" max-width="400">
      <v-list>
        <v-list-item-group v-model="model" mandatory color="indigo">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="{ path: item.pagePath }"
            @click="menuActionClick(item.text)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- <v-sheet class="pa-2">
      <v-toolbar flat height="auto" class="pa-md-4 mx-lg-auto">
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          label="Theme Dark"
        ></v-switch>
      </v-toolbar>
    </v-sheet> -->
  </v-navigation-drawer>
</template>
 
<script>
export default {
  name: "main-leftmenu",
  data: () => ({
    items: [
      {
        icon: "mdi-home",
        text: "Home",
        pagePath: "./home",
      },
      {
        icon: "mdi-inbox",
        text: "Chart",
        pagePath: "./chart",
      },
      {
        icon: "mdi-table-cog",
        text: "Account",
        pagePath: "./account",
      },
      {
        icon: "mdi-monitor-edit",
        text: "Deposit & Withdrawal",
        pagePath: "./dnw",
      },
      // {
      //   icon: "mdi-table-cog",
      //   text: "Items",
      //   pagePath: "./Cate",
      // },
      // {
      //   icon: "mdi-chart-donut",
      //   text: "Data Usage",
      //   pagePath: "./Home",
      // },
    ],
    model: 0,
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    menuActionClick(text) {
      this.$store.state.global.subtitle = text;
      //this.$store.commit("CHANGE_SUBTITLE", text);
    },
  },
};
</script>
 
<style scoped>
</style>