<template>
  <div id="cate" app>
    <v-row dense>
      <v-col cols="12" md="12" sm="12">
        <CateForm />
      </v-col>
    </v-row>
    <v-row>
      <CateList />
    </v-row>
  </div>
</template>

<script>
import CateForm from "../components/Category/CateForm.vue";
import CateList from "../components/Category/CateList.vue";

export default {
  name: "Cate",
  components: {
    CateForm: CateForm,
    CateList: CateList,
  },
};
</script>
