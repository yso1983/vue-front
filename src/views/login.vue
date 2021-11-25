<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="id"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onSubmit()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      id: '',
      password: '',
    };
  },
  methods:{
    onSubmit(){
      const id = this.id;
      const password = this.password;
      this.$axios
        .post("/api/auth/signin", {id, password}, {})
        .then((res) => {
          const user = res.data.data;
          if (user) {
            this.$store.dispatch("SET_USER", user);
            this.$router.push({
              name: "Home",
            });
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
};
</script>

<style></style>
