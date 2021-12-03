<template>
  <v-card class="mx-auto text-center" dark app>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit(false)">
        <input type="hidden" v-model="account.id" />
        <validation-provider
          v-slot="{ errors }"
          name="select_users"
          rules="required"
        >
          <v-select
            v-model="account.user_id"
            :items="users"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            label="Select Users"
            data-vv-name="select_users"
            required
          ></v-select>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="select_accounts"
          rules="required"
        >
          <v-select
            v-model="account.id"
            :items="accounts"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            label="Select Account"
            data-vv-name="select_accounts"
            required
          ></v-select>
        </validation-provider>
        <v-row>
          <v-col cols="11" md="11" sm="11">
            <validation-provider
              v-slot="{ errors }"
              name="select_items"
              rules="required"
            >
              <v-select
                v-model="account.id"
                :items="items"
                item-text="name"
                item-value="id"
                :error-messages="errors"
                label="Select Items"
                data-vv-name="select_items"
                required
              ></v-select>
            </validation-provider>
          </v-col>
          <v-col cols="1" md="1" sm="1" class="ma-auto pl-0">
            <ItemForm />
          </v-col>
        </v-row>

        <validation-provider
          v-slot="{ errors }"
          name="항목"
          rules="required|max:25"
        >
          <v-text-field
            v-model="account.name"
            :counter="25"
            :error-messages="errors"
            label="항목"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="잔액" rules="required">
          <v-text-field
            v-model="account.amount"
            :error-messages="errors"
            label="잔액"
            type="number"
            min="0"
            step=".1"
            required
          ></v-text-field>
        </validation-provider>
        <v-textarea
          solo
          v-model="account.remark"
          name="비고"
          :counter="200"
          label="비고"
          outlined
        ></v-textarea>
        <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>
<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { mapGetters } from 'vuex';

import AccountService from "../../services/account.service";
import UserService from "../../services/user.service";
import DnwService from "../../services/dnw.service";

import Account from "../../models/account";
import ItemForm from "./DnwItemForm.vue";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ItemForm,
  },
  data: () => ({
    users: [],
    accounts: [],
    //dwnitems: []
  }),
  computed: {
    ...mapGetters('dnw',  [
      'items',
    ]),
    account() {
      return this.$store.state.global.account;
    },
  },
  methods: {
    submit(isReTry) {
      this.$refs.observer.validate();
      AccountService.setAaccount(
        new Account(
          this.account.id,
          this.account.user_id,
          this.account.name,
          this.account.amount,
          this.account.remark
        )
      )
        .then((res) => {
          if (res) {
            if (res.data.code === "0000") {
              this.clear();
              //this.$parent.$children[1].read();
            } else if (res.data.code === "3100") {
              if (!isReTry) {
                this.$store.dispatch("auth/refresh").then(
                  () => {
                    this.submit(true);
                  },
                  (error) => {
                    console.log(error.message);
                    // this.loading = false;
                    // this.message =
                    //   (error.response && error.response.data) ||
                    //   error.message ||
                    //   error.toString();

                    this.$store.dispatch("auth/logout");
                    this.$router.push({ name: "LoginPage" });
                  }
                );
              }
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    clear() {
      this.$store.dispatch(
        "global/CHANGE_ACCOUNT",
        new Account(0, 0, "", 0, "")
      );
      this.$refs.observer.reset();
    },
    getUsers() {
      UserService.getUsers().then((res) => {
        if (res.data && res.data.code === "0000") {
          this.users = res.data.data;
        }
      });
    },
    getDetails() {
       this.$store.dispatch("dnw/details").then(
        (res) => {
          if(res.code === "3100"){
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "LoginPage" });
          }

          if(res.code === "0000"){
            //this.dwnitems = res.data;
          }
        },
        (error) => {
          alert(error.message);
        }
      ).catch(err => alert(err.message));
    },
    getItems(){
      this.$store.dispatch("dnw/items").then(
        (res) => {
          if(res.code === "3100"){
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "LoginPage" });
          }

          if(res.code === "0000"){
            //this.dwnitems = res.data;
          }
        },
        (error) => {
          alert(error.message);
        }
      ).catch(err => alert(err.message));
    },
  },
  created() {
    this.getUsers();
    this.getDetails();
    this.getItems();
  },
  mounted() {
    this.$store.dispatch(
      "global/CHANGE_ACCOUNT",
      new Account(0, this.$store.state.auth.user.id, "", "", "")
    );
  },
};
</script>