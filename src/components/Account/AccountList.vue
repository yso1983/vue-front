<template>
  <v-data-table id="account_list"
    style="width: 100%"
    :headers="headers"
    :items="$store.state.account.accounts"
    :items-per-page="10"
		item-key="id"
    class="elevation-1 ml-3 mr-3"
		@click:row="handleClick"
  >
    <template v-slot:item.amount="{ item }">
      <span>{{ item.amount | makeComma }}</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "owner",
        align: "start",
        sortable: false,
        value: "user_name",
      },
      { text: "항목", value: "name" },
      { text: "비고", value: "remark" },
      { text: "잔액", value: "amount" },
    ]
  }),
	methods: {
    handleClick(value) {
			let account = {
					id: value.id,
					name: value.name,
					select: value.user_id,
					remark: value.remark,
					amount: value.amount
				};
			this.$store.commit("CHANGE_ACCOUNT", account);
    },
    read() {
      this.$axios.get("/api/account").then((res) => {
        if (res.data) {
          this.$store.commit("CHANGE_ACCOUNT_LIST", res.data);
        }
      });
    },
  },
  created() {
    this.read();
  },
};
</script>