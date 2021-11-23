<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    app
  >
    <!--  color="grey lighten-4" -->
    <v-sheet
      class="pa-2"
    >
      <!-- <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
      ></v-avatar> 
      <div>john@vuetifyjs.com</div>-->
      <v-toolbar
        flat
        height="auto"
        class="pa-md-4 mx-lg-auto"
      >
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          label="Theme Dark"
        ></v-switch>
      </v-toolbar>
    </v-sheet>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="n in 3"
        :key="n"
        :to="{ path: '/page' + n }"
        link
      >
        <v-list-item-content>
          <v-list-item-title>
            List Item {{ n }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>
 
<script>
export default {
  name: 'main-leftmenu',
}
</script>
 
<style scoped>
</style>