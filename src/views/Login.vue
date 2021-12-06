<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Login Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="user.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="user.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-checkbox
                  class="ml-2"
                  v-model="checkbox"
                  label="Email 정보 기억하기"
                ></v-checkbox>
                <v-spacer></v-spacer>
                <v-btn @click="handleLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      checkbox: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "Chart" });
    }
  },
  methods: {
    handleLogin() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$store.state.global.subtitle = "Chart";
            this.$router.push({ name: "Chart" });
            if(this.checkbox)
              localStorage.setItem("loginEmail", this.user.email);
            else 
              localStorage.removeItem('loginEmail');
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
  mounted(){
    let loginEmail = localStorage.getItem("loginEmail");
    if(loginEmail)
    {
      this.checkbox = true;
      this.user = new User("", "", loginEmail, "");
    }
  }
};
</script>

<style></style>
