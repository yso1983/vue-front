<template>
  <div id="lotto" app>
    <v-row dense>
      <v-col cols="12" md="12" sm="12">
        <Form />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <List />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import LottoForm from "../components/Lotto/LottoForm.vue";
import LottoList from "../components/Lotto/LottoList.vue";

export default {
  name: "content-lotto",
  components: {
    Form: LottoForm,
    List: LottoList,
  },
};
</script>
