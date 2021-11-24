<template>
	
  <div id="account" app>
		<v-row dense>
			<v-col cols="12" md="12" sm="12">
        <AccountForm />
      </v-col>
    </v-row>
		<v-row>
			<AccountList />
		</v-row>
  </div>
</template>

<script>
import AccountForm from "../components/Account/AccountForm.vue";
import AccountList from "../components/Account/AccountList.vue";

export default {
  name: "account",
	components:{
		"AccountForm" : AccountForm,
		"AccountList" : AccountList
	}
};
</script>