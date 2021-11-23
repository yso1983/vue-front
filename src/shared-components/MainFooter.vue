<template>
  <v-footer app>
      <!-- -->
    <v-bottom-navigation
      :value="value"
      class="rounded-lg"
      color="primary"
      horizontal
    >
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script>
  export default {
    name: 'main-footer',
    data: () => ({ value: 1 }),
  }
</script>