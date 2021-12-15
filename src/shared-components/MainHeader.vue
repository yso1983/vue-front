<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      @click="$store.state.global.drawer = !$store.state.global.drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $store.state.global.subtitle }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in itemFilter()"
          :key="i"
          @click="itemOnClick(item.text)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
 
<script>
export default {
  name: "main-header",
  data: () => ({
    items: [
      {
        icon: "mdi-group",
        text: "Group",
      },
      {
        icon: "mdi-account",
        text: "Profile",
      },
      {
        icon: "mdi-account-outline",
        text: "Logout",
      },
    ],
  }),
  methods: {
    itemOnClick(text) {
      if (text == "Logout") {
        this.$store.dispatch("auth/logout");
        this.$router.push({ name: "LoginPage" });
      }
      else{
        this.$router.push({ name: text });
      }
    },
    itemFilter(){
      const cnt = this.$store.state.auth.groups.length;
      return this.items.filter(x => {
        if(!(x.text == "Group" && cnt < 2)){
          return x;
        }
      });
    }
  },
};
</script>
 
<style scoped>
</style>