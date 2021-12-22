<template>
  <div id="user_accounts" app>
    <v-row dense>
      <v-col cols="12" md="12" sm="12">
        <Users />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Users from "../components/Account/UserAccounts.vue";

export default {
  name: "UserAccounts",
  components: {
    Users: Users
  },
};
</script>
