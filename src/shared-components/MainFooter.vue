<template>
  <v-footer app>
      <!-- -->
    <v-bottom-navigation
      :value="value"
      class="rounded-lg"
      color="primary"
      horizontal
    >
      <v-btn
        v-for="item in items"
        :key="item.text"
        @click="itemOnClick(item.text)"
      >
        <span>{{item.text}}</span>

        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script>
  export default {
    name: "main-footer",
    data: () => ({ 
      items: [
        {
          icon: "mdi-table-cog",
          text: "Account",
        },
        {
          icon: "mdi-monitor-edit",
          text: "D&W",
        },
        {
          icon: "mdi-map-marker",
          text: "Nearby",
        },
      ]
    }),
    methods: {
      itemOnClick(text) {
        this.$store.state.global.subtitle = text;
        this.$router.push({ name: text }).catch(()=>{});
      },
    },
  };
</script>