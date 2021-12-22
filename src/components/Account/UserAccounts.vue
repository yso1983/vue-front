<template>
  <v-data-table
    :headers="headers"
    :items="user_accounts"
    sort-by="calories"
    class="elevation-1 pa-2"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>그룹</v-toolbar-title>
        <v-select
          :items="groups"
          item-text="name"
          item-value="id"
          v-model="groupId"
          @change="getUsersByGroup($event)"
          clearable
          class="mx-3"
        ></v-select>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-3"
        ></v-text-field>
        <v-divider class="mx-3" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2 mt-2" v-bind="attrs" v-on="on">
              New
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
                      <v-col cols="12" sm="12" md="12">
                        <v-combobox
                          v-model="editedItem.groups"
                          :items="groups"
                          item-text="name"
                          item-value="id"
                          label="그룹"
                          multiple
                          chips
                        ></v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="email"
                          rules="required|email|max:40"
                        >
                          <v-text-field
                            v-model="editedItem.email"
                            :error-messages="errors"
                            :counter="40"
                            label="email"
                            required
                            email
                            :disabled="disabled"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="계정"
                          rules="required|max:20"
                        >
                          <v-text-field
                            v-model="editedItem.username"
                            :error-messages="errors"
                            :counter="20"
                            label="계정"
                            required
                            :disabled="disabled"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <validation-provider
                          v-slot="{ errors }"
                          name="사용자명"
                          rules="required|max:20"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            :error-messages="errors"
                            :counter="20"
                            label="사용자명"
                            required
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          v-model="locked"
                          inset
                          hide-details
                          label="정지 여부"
                        ></v-switch>
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
      <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { required, max, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import { mapGetters } from "vuex";

import UserService from "../../services/user.service";
import AutoService from "../../services/automatic.dnw.service";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "userAccount",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    menu2: false,
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: "계정", align: "start", value: "username" },
      { text: "사용자명", value: "name" },
      { text: "email", value: "email" },
      { text: "정지여부", value: "account_locked" },
      { text: "수정", value: "actions", sortable: false },
    ],
    user_accounts: [],
    editedIndex: -1,
    editedItem: {},
    groups: [],
    groupId: "",
    sso_types: ["KAKAO"],
    locked: false,
    defaultItem: {
      id: null,
      name: "",
      username: "",
      email: "",
      account_locked: "N",
      groups: [],
    },
    disabled: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "신규" : "수정";
    },
    ...mapGetters("dnw", ["items"]),
    automatics() {
      return this.$store.state.automaticDnw.details;
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
      this.editedItem = this.defaultItem;
      this.getGroups();
      this.getUsersByGroup();
    },

    editItem(item) {
      this.disabled = true;
      this.locked = item.account_locked == "Y" ? true : false;
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
      this.disabled = false;
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
      let item = this.editedItem;
      let groups = [];

      item.groups.forEach((e) => {
        groups.push(e.id);
      });

      if (!groups || groups.length < 1) {
        this.$store.dispatch("global/OPEN_DIALOG", "그룹을 선택하세요!");
        return;
      }

      this.$refs.observer.validate();

      let params = {
        id: item.id,
        name: item.name,
        username: item.username,
        email: item.email,
        account_locked: this.locked ? "Y" : "N",
        groups: groups,
      };

      this.$store
        .dispatch("auth/register", params)
        .then((res) => {
          if (res) {
            if (res.code === "0000") {
              this.getUsersByGroup(this.groups.id);
              this.close();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    getGroups() {
      UserService.getGroups().then((res) => {
        if (res.data && res.data.code === "0000") {
          this.groups = res.data.data;
        }
      });
    },

    getUsersByGroup(event) {
      //console.log(event);
      UserService.getUsersByGroup(event).then((res) => {
        if (res.data && res.data.code === "0000") {
          //console.log(res.data.data);
          this.user_accounts = res.data.data;
        }
      });
    },
  },
};
</script>