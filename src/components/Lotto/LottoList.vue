<template>
  <v-card fluid width="100%" 
    lass="elevation-1 ml-3 mr-3 pa-2">
    <v-card-title class="ml-10">
      당첨 리스트
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="15"
      item-key="id"
      :loading="loading"
      class="elevation-1 ml-3 mr-3 pa-2"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import service from "../../services/lotto.service";

export default {
  data: () => ({
    loading: true,
    list: [],
    headers: [
      { text: "회차", align: "center", value: "drwNo" },
      { text: "당첨번호(1)", value: "drwtNo1" },
      { text: "당첨번호(2)", value: "drwtNo2" },
      { text: "당첨번호(3)", value: "drwtNo3" },
      { text: "당첨번호(4)", value: "drwtNo4" },
      { text: "당첨번호(5)", value: "drwtNo5" },
      { text: "당첨번호(6)", value: "drwtNo6" },
      { text: "보너스", value: "bnusNo" }
    ],
  }),
  computed: {
  },
  methods: {
    read() {
      this.loading = true;
      service.getLottoList()
      .then((res) => {
        if (res.data && res.data.code === "0000") {
          this.list = res.data.data;
        }
        this.loading = false;
      })
      .catch((e) => this.loading = false);
    },
  },
  created() {
    this.read();
  },
};
</script>