<template>
  <div id="dnw" app>
    <DnwForm />
    <v-divider></v-divider>
    <DnwList />
  </div>
</template>
<script>
import DnwForm from "../components/Dnw/DnwForm.vue";
import DnwList from "../components/Dnw/DnwList.vue";

export default {
  name: "dnw",
  components: {
    DnwForm: DnwForm,
    DnwList: DnwList,
  },
};
</script>
