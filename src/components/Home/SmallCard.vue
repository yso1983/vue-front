<template>
  <v-card>
    <v-container pa-1>
      <v-layout row>
        <v-flex class="xs12">
          <v-card-title primary-title>
            <div>
              <div class="grey--text">{{ title }}</div>
              <h3 class="headline">{{ number }}</h3>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-2">
        <v-icon small :color="bIconColor">{{ bIcon }}</v-icon>
        <span class="grey--text caption font-italic">&nbsp;{{ bText }}</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    title: String,
    number: Number,
    tIcon: String,
    tIconColor: String,
    bIcon: String,
    bIconColor: String,
    bText: String,
    xsClass: String,
    isShow: Boolean,
  },
};
</script>