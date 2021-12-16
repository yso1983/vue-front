<template>
  <v-data-table
    :headers="headers"
    :items="automatics"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:[`item.amount`]="{ item }">
      <span>{{ item.amount | makeComma }}</span>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>매월 자동 입출금</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="save()">
                <v-card-text>
                  <v-container>
                    <input type="hidden" v-model="editedItem.id" />
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="select_users"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.user_id"
                            :items="users"
                            item-text="name"
                            item-value="id"
                            :error-messages="errors"
                            required
                            disabled
                          ></v-select>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="select_accounts"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.account_id"
                            :items="accounts"
                            item-text="name"
                            item-value="id"
                            :error-messages="errors"
                            label="계좌"
                            data-vv-name="select_accounts"
                            required
                          ></v-select>
                        </validation-provider>
                      </v-col>
                      <v-col cols="11" sm="11" md="11">
                        <validation-provider
                          v-slot="{ errors }"
                          name="select_items"
                          rules="required"
                        >
                          <v-select
                            v-model="editedItem.dnw_item_id"
                            :items="items"
                            item-text="name"
                            item-value="id"
                            :error-messages="errors"
                            label="항목"
                            data-vv-name="select_items"
                            required
                          ></v-select>
                        </validation-provider>
                      </v-col>

                      <v-col cols="1" md="1" sm="1" class="ma-auto pl-0">
                        <ItemForm />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="금액"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.amount"
                            :error-messages="errors"
                            label="금액"
                            type="currency"
                            step=".1"
                            required
                            @keyup="onBlurNumber"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="기준일"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.day"
                            :error-messages="errors"
                            label="기준일"
                            type="number"
                            step=".1"
                            min="1"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    type="submit"
                    :disabled="invalid"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </form>
            </validation-observer>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import { mapGetters } from "vuex";

import AccountService from "../../services/account.service";
import UserService from "../../services/user.service";
import AutoService from "../../services/automatic.dnw.service";

import autoDetail from "../../models/automatic.dnw.detail";
import ItemForm from "../Dnw/DnwItemForm.vue";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

export default {
  name: "automaticDnw",
  components: {
    ValidationProvider,
    ValidationObserver,
    ItemForm,
  },
  data: () => ({
    users: [],
    accounts: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu2: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Owner",
        align: "start",
        //sortable: false,
        value: "user_name",
      },
      { text: "계좌", value: "account_name" },
      { text: "항목", value: "dnw_item_name" },
      { text: "금액", value: "amount" },
      { text: "기준일", value: "day" },
      { text: "수정/삭제", value: "actions", sortable: false },
    ],
    //automatics: [],
    editedIndex: -1,
    editedItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "신규" : "수정";
    },
    ...mapGetters("dnw", ["items"]),
    automatics() {
      return this.$store.state.automaticDnw.details;
    },
    defaultItem() {
      return new autoDetail(
        0,
        0,
        0,
        this.$store.state.auth.user.id,
        null,
        null
      );
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.editedItem = new autoDetail(
        0,
        0,
        0,
        this.$store.state.auth.user.id,
        null,
        null
      );
      this.getUsers();
      this.getAccounts();
      this.getItems();
      this.getAutomatics();
    },

    editItem(item) {
      //this.editedIndex = this.automatics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      //this.editedIndex = this.automatics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //console.log(this.editedItem);
      AutoService.remove(this.editedItem.id)
        .then((res) => {
          if (res) {
            if (res.data.code === "0000") {
              this.getAutomatics();
              //this.automatics.splice(this.editedIndex, 1);
              this.closeDelete();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    close() {
      this.$refs.observer.reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$refs.observer.validate();
      AutoService.setDetail(this.editedItem)
        .then((res) => {
          if (res) {
            if (res.data.code === "0000") {
              // if (this.editedIndex > -1) {
              //   Object.assign(this.automatics[this.editedIndex], this.editedItem);
              // } else {
              //   this.automatics.push(this.editedItem);
              // }
              this.getAutomatics();
              this.close();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    getUsers() {
      UserService.getUsers().then((res) => {
        if (res.data && res.data.code === "0000") {
          this.users = res.data.data;
        }
      });
    },
    getAccounts() {
      AccountService.getAaccounts(
        "userid=" + this.$store.state.auth.user.id
      ).then((res) => {
        if (res.data && res.data.code === "0000") {
          this.accounts = res.data.data;
        }
      });
    },
    getItems() {
      this.$store
        .dispatch("dnw/items")
        .then(
          (res) => {
            if (res.code === "3100") {
              this.$store.dispatch("auth/logout");
              this.$router.push({ name: "LoginPage" });
            }

            if (res.code === "0000") {
              // if (res.data)
              //   this.$store.dispatch("dnw/setDetail", res.data);
            }
          },
          (error) => {
            alert(error.message);
          }
        )
        .catch((err) => alert(err.message));
    },

    getAutomatics() {
      this.$store
        .dispatch("automaticDnw/details", this.date)
        .then(
          (res) => {
            if (res.code === "0000") {
              // if (res.data)
              //   this.$store.dispatch("dnw/setDetail", res.data);
            }
          },
          (error) => {
            alert(error.message);
          }
        )
        .catch((err) => alert(err.message));
    },

    onBlurNumber(){
      const result = this.editedItem.amount.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.editedItem.amount = result;
    },
  },
};
</script>