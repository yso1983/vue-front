<template>
  <v-navigation-drawer v-model="$store.state.global.drawer" app>
    <!--  color="grey lighten-4" -->
    <v-sheet color="grey" class="pa-4">
      <v-row dense>
        <v-col cols="4">
          <v-avatar color="indigo mb-2">
            <v-icon dark> mdi-account-circle </v-icon>
          </v-avatar>
          <div>Hi {{ currentUser.name }}</div>
        </v-col>
        <v-col cols="8">
          <v-toolbar flat height="auto" class="pa-4 mx-lg-auto grey">
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              hide-details
              label="Theme Dark"
            ></v-switch>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider></v-divider>

    <v-card class="mx-auto" max-width="400">
      <v-list>
        <v-list-item-group v-model="model" mandatory color="indigo">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            :to="{ path: item.pagePath }"
            @click="menuActionClick(item.title)"
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
        title: "Home",
        pagePath: "./home",
      },
      // {
      //   icon: "mdi-inbox",
      //   text: "Chart",
      //   title: "Chart",
      //   pagePath: "./chart",
      // },
      {
        icon: "mdi-table-cog",
        text: "Account",
        title: "Account",
        pagePath: "./account",
      },
      {
        icon: "mdi-monitor-edit",
        text: "Deposit & Withdrawal",
        title: "Deposit & Withdrawal",
        pagePath: "./dnw",
      },
      {
        icon: "mdi-autorenew",
        text: "Automatic D&W",
        title: "Automaric Deposit & Withdrawal",
        pagePath: "./automaricDnw",
      },
      {
        icon: "mdi-note-edit-outline",
        text: "Memo",
        title: "Memo",
        pagePath: "./note",
      },
      {
        icon: "mdi-numeric-5-circle-outline",
        text: "Lotto",
        title: "Lotto",
        pagePath: "./lotto",
      },
      {
        icon: "mdi-account-multiple",
        text: "Users",
        title: "User Accounts",
        pagePath: "./users",
      },
    ],
    model: 0,
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    menuItems() {
      return this.items.filter((i) => {
        if (i.text === "Users") {
          if (this.$store.state.auth.status.isAdmin == true) {
            return i;
          }
        } else if(i.text === "Automatic D&W"){
          if (localStorage.getItem("groupid") != "3") {
            return i;
          }
        } else {
          return i;
        }
      });
    },
  },
  methods: {
    menuActionClick(text) {
      this.$store.state.global.subtitle = text;
    },
  },
};
</script>
 
<style scoped>
</style>