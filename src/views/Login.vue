<template>
  <v-app id="inspire">
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
                  @keyup.enter="handleLogin"
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
            <v-card-actions>
              <v-img :src="kakaoImg" class="ma-2" @click="kakaoLogin"></v-img>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      kakaoImg: process.env.BASE_URL + "kakao_login_medium_wide.png",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    selectedGroupId() {
      return this.$store.state.auth.status.selectedGroupId;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    handleLogin() {
      if (this.user.email && this.user.password) {
        this.$store
          .dispatch("auth/login", this.user)
          .then(
            (res) => {
              if (this.checkbox)
                localStorage.setItem("loginEmail", this.user.email);
              else localStorage.removeItem("loginEmail");

              let { groups } = res;

              if (groups != null && groups.length > 0) {
                if (groups.length > 1) {
                  this.$router.push({ name: "Group" });
                } else {
                  this.$store.state.global.subtitle = "Home";
                  this.$router.push({ name: "Home" });
                }
              } else {
                this.$store.dispatch(
                  "global/OPEN_DIALOG",
                  "소속된 그룹이 없습니다."
                );
              }
            },
            (error) => {
              console.log(error.response);
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

              //console.log(this.message);
              this.$store.dispatch("global/OPEN_DIALOG", this.message.message);
            }
          )
          .catch((err) => {
            this.$store.dispatch("global/OPEN_DIALOG", err.message);
          });
      }
    },
    kakaoLogin() {
      // console.log(window.Kakao);
      window.Kakao.Auth.login({
        scope: "account_email, profile_nickname, friends",
        success: this.GetMe,
      });
    },
    GetMe(authObj) {
      // console.log(authObj);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const userInfo = {
            email: kakao_account.email,
            password: "",
            login_type: "KAKAO",
            //nickname: kakao_account.profile.nickname,
          };

          this.$store.dispatch("auth/login", userInfo).then(
            (res) => {
              let { groups } = res;

              if (groups != null && groups.length > 0) {
                if (groups.length > 1) {
                  this.$router.push({ name: "Group" });
                } else {
                  this.$store.state.global.subtitle = "Home";
                  this.$router.push({ name: "Home" });
                }
              } else {
                this.$store.dispatch(
                  "global/OPEN_DIALOG",
                  "소속된 그룹이 없습니다."
                );
              }
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();

              //console.log(this.message);
              this.$store.dispatch("global/OPEN_DIALOG", this.message);
            }
          );

          //console.log(userInfo);
          //alert("로그인 성공!");
        },
        fail: (err) => {
          console.log(err);
          this.$store.dispatch("global/OPEN_DIALOG", err.message);
        },
      });
    },
  },
  mounted() {
    let loginEmail = localStorage.getItem("loginEmail");
    if (loginEmail) {
      this.checkbox = true;
      this.user = new User("", "", loginEmail, "");
    }
  },
};
</script>

<style></style>
