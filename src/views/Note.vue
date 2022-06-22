<template>
  <div id="div_note" app>
    <v-row dense>
      <v-col cols="12" md="12" sm="12">
        <Notes />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Notes from "../components/Other/Notes.vue";

export default {
  name: "content-notes",
  components: {
    Notes: Notes
  },
};
</script>
