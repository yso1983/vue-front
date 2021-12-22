<template>
  <v-data-table
    id="account_list"
    style="width: 98%"
    :headers="headers"
    :items="accounts"
    :items-per-page="15"
    item-key="id"
    :loading="loading"
    class="elevation-1 ml-3 mr-3 pa-2"
    @click:row="handleClick"
  >
    <template v-slot:[`item.amount`]="{ item }">
      <span>{{ item.amount | makeComma }}</span>
    </template>
  </v-data-table>
</template>

<script>
import AccountService from "../../services/account.service";
import Account from "../../models/account";

export default {
  data: () => ({
    loading: true,
    headers: [
      {
        text: "owner",
        align: "start",
        sortable: false,
        value: "user_name",
      },
      { text: "계좌", value: "name" },
      { text: "잔액", value: "amount" },
      { text: "비고", value: "remark" },
    ],
  }),
  computed: {
    accounts() {
      //console.log(this.$store.state.auth.status.loggedIn);
      return this.$store.state.global.accounts;
    },
  },
  methods: {
    handleClick(value) {
      this.$store.dispatch("global/CHANGE_ACCOUNT", new Account(value.id, value.user_id, value.name
      , value.amount.toString().substring(0, value.amount.toString().indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      , value.remark));
    },
    read() {
      this.loading = true;
      AccountService.getAaccounts()
      .then((res) => {

        if (res.data && res.data.code === "0000") {
          this.loading = false;
          this.$store.dispatch("global/CHANGE_ACCOUNT_LIST", res.data.data);
        }
      });
    },
  },
  created() {
    this.read();
  },
};
</script>