<template>
  <v-card id="dnw_form" class="mx-auto text-center pa-2" app>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit()">
        <input type="hidden" v-model="detail.id" />
        <validation-provider
          v-slot="{ errors }"
          name="select_users"
          rules="required"
        >
          <v-select
            v-model="detail.user_id"
            :items="users"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            data-vv-name="select_users"
            required
            @change="onChange($event)"
            disabled
          ></v-select>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="select_accounts"
          rules="required"
        >
          <v-select
            v-model="detail.account_id"
            :items="accounts"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            label="계좌를 선택하세요!"
            data-vv-name="select_accounts"
            required
          ></v-select>
        </validation-provider>
        <v-row>
          <v-col cols="11" md="5" sm="5">
            <validation-provider
              v-slot="{ errors }"
              name="select_items"
              rules="required"
            >
              <v-select
                v-model="detail.dnw_item_id"
                :items="items"
                item-text="name"
                item-value="id"
                :error-messages="errors"
                label="항목을 선택하세요!"
                data-vv-name="select_items"
                required
              ></v-select>
            </validation-provider>
          </v-col>
          <v-col cols="1" md="1" sm="1" class="ma-auto pl-0">
            <ItemForm />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-dialog
              ref="dialog"
              v-model="menu2"
              :close-on-content-click="ture"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="detail.standard_dt"
                  label="기준일자"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="ko-kr"
                v-model="detail.standard_dt"
                @input="menu2 = false"
              ></v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="1" sm="2">
            <validation-provider
              v-slot="{ errors }"
              name="입출금 종류"
              rules="required"
            >
              <v-select
                v-model="kind"
                :items="kinds"
                item-text="name"
                item-value="id"
                :error-messages="errors"
                label="입출금 종류"
                data-vv-name="select_kind"
                required
              ></v-select>
            </validation-provider>
          </v-col>
          <v-col cols="12" md="11" sm="10">
            <validation-provider
              v-slot="{ errors }"
              name="금액"
              rules="required"
            >
              <v-text-field
                v-model="detail.amount"
                :error-messages="errors"
                label="금액"
                type="currency"
                step=".1"
                required
                @keyup="onBlurNumber"
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>

        <validation-provider
          v-slot="{ errors }"
          name="select_to_accounts"
        >
          <v-select
            
            v-model="detail.to_account_id"
            :items="toAccounts"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            label="받을 계좌 선택하세요!"
            data-vv-name="select_to_accounts"
            clearable
          ></v-select>
        </validation-provider>
        <v-textarea
          solo
          v-model="detail.remark"
          name="비고"
          :counter="200"
          label="비고"
          outlined
          rows="2"
          row-height="20"
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
import { mapGetters } from "vuex";

import AccountService from "../../services/account.service";
import UserService from "../../services/user.service";
import DnwService from "../../services/dnw.service";

import dnwDetail from "../../models/dnw.detail";
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
  name: "dnwForm",
  components: {
    ValidationProvider,
    ValidationObserver,
    ItemForm,
  },
  data: () => ({
    users: [],
    accounts: [],
    toAccounts: [],
    //dwnitems: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu2: false,
    kind: null,
    kinds: [
      { id: -1, name: "출금" },
      { id: 1, name: "입금" },
    ],
  }),
  computed: {
    ...mapGetters("dnw", ["items"]),
    detail() {
      return this.$store.state.dnw.detail;
    },
    groupid() {
      return localStorage.getItem("groupid");
    },
  },
  watch: {
    kind: function () {
      this.onBlurNumber();
    },
  },
  methods: {
    initialize() {
      this.getUsers();
      this.getAccounts();
      this.getItems();
    },
    submit() {
      this.$refs.observer.validate();
      DnwService.setDetail(this.detail)
        .then((res) => {
          if (res) {
            if (res.data.code === "0000") {
              this.clear();
              this.$parent.$children
                .filter((x) => x.$el.id == "dnw_list")[0]
                .getDetails();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    clear() {
      //console.log("=-------------==", this.$store.state.dnw.items[0]?.id);

      this.kind = null;
      this.$store.dispatch(
        "dnw/changeDetail",
        new dnwDetail(
          0,
          0,
          this.$store.state.dnw.items[0]?.id,
          this.$store.state.auth.user.id,
          null,
          this.date,
          "",
          0
        )
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
    getAccounts() {
      AccountService.getAaccounts().then((res) => {
        if (res.data && res.data.code === "0000") {
          this.toAccounts = res.data.data;
          this.accounts = this.toAccounts.filter(
            (a) => a.user_id == this.$store.state.auth.user.id
          );
        }
      });
    },
    getItems() {
      this.$store
        .dispatch("dnw/items")
        .then(
          (res) => {
            //console.log("===================", res);
            if (res.code === "0000") {
              this.$store.dispatch(
                "dnw/changeDetail",
                new dnwDetail(
                  0,
                  0,
                  this.$store.state.dnw.items[0]?.id,
                  this.$store.state.auth.user.id,
                  null,
                  this.date,
                  "",
                  0
                )
              );
            } 
          },
          (error) => {
            alert(error.message);
          }
        )
        .catch((err) => alert(err.message));
    },
    onChange(event) {
      this.getAccounts();
    },

    onBlurNumber() {
      if (this.detail.amount) {
        let kind = parseFloat(this.kind ?? 1);
        let amount =
          "" + kind * parseFloat(this.detail.amount.replace(/\D/g, ""));

        const result = amount.replace(/\D/g, "") == "" ? 0 : amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.detail.amount = result;
      }
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    //console.log(this.$parent.$children.filter(x => x.$el.id == 'dnw_list'));
    this.clear();
    // this.$store.dispatch(
    //   "dnw/changeDetail",
    //   new dnwDetail(0, 0, 0, this.$store.state.auth.user.id, null, this.date, "")
    // );
  },
};
</script>