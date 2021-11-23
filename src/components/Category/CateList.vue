<template>
  <v-data-table
    style="width: 100%"
    :headers="headers"
    :items="desserts"
    :items-per-page="10"
		item-key="id"
    class="elevation-1 ml-3 mr-3"
		@click:row="handleClick"
  ></v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "account name",
        align: "start",
        sortable: false,
        value: "account_name",
      },
      { text: "owner", value: "user_name" },
      { text: "remark", value: "remark" },
    ],
    desserts: [
      {
				id: 1,
        account_name: "국민은행(생활비)",
        user_id: 1,
        user_name: '용수',
				remark: '',
      },
      {
				id: 2,
        account_name: "국민은행",
        user_id: 2,
        user_name: '봉화',
				remark: '123',
      },
    ],
  }),
	methods: {
    handleClick(value) {
			let cate = {
					id: value.id,
					name: value.account_name,
					select: value.user_id,
					remark: value.remark
				};
			this.$store.commit("CHANGE_CATE", cate);
    },
  },
};
</script>