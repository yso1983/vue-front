<template>
  <div id="automaticDnw" app>
    <v-row dense>
      <v-col cols="12" md="12" sm="12">
        <AutomaticList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AutomaticList from "../components/AutomaticDnw/AutomaticList.vue";

export default {
  name: "AutomaticDnw",
  components: {
    AutomaticList: AutomaticList
  },
};
</script>
