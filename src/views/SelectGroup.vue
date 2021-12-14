<template>
  <v-app id="sel_group">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Select Group</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-select
                v-model="groupid"
                :items="groups"
                item-text="name"
                item-value="id"
                label="Select Group"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="handleSelect()">선택</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Group",
  props: {
    source: String,
  },
  data() {
    return {
      groupid: "",
    };
  },
  computed: {
    groups() {
      return this.$store.state.auth.groups;
    },
  },
  methods: {
    handleSelect() {
      if (this.groupid) {
        localStorage.setItem("groupid", this.groupid);
				this.$store.dispatch("auth/selectGroupId");
				

        this.$store.state.global.subtitle = "Home";
        this.$router.push({ name: "Home" });
      } else {
        this.$store.dispatch("global/OPEN_DIALOG", "그룹을 선택하세요!");
      }
    },
  },
};
</script>

<style></style>
