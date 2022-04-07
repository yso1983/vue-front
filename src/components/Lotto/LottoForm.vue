<template>
  <v-card fluid width="100%" 
    lass="elevation-1 ml-3 mr-3 pa-2">
    <v-card-title class="ml-10">
      랜덤추출
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="numbers"
      sort-by="seq"
      class="elevation-1 pa-2"
      disable-sort="true"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat class="">
          <v-toolbar-title class="pb-3">수량</v-toolbar-title>
          <v-text-field
            v-model="num"
            class="mx-3"
            type="number"
            value="5"
          ></v-text-field>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-btn
            depressed
            color="primary"
            @click="getRandomNumbers()"
          >
            조회
          </v-btn>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-btn
            depressed
            @click="setSync()"
          >
            동기화
          </v-btn>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item="{item, index}">
        <tr>
        <td>{{index + 1}}</td>
          <td>{{item.drwtNo1}}</td>
          <td>{{item.drwtNo2}}</td>
          <td>{{item.drwtNo3}}</td>
          <td>{{item.drwtNo4}}</td>
          <td>{{item.drwtNo5}}</td>
          <td>{{item.drwtNo6}}</td>
        </tr>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script>

import { mapGetters } from "vuex";

import service from "../../services/lotto.service";

export default {
  name: "lottoRandom",
  data: () => ({
    loading: false,
    numbers: [],
    num: 5,
    headers: [
      // { text: "순번", align: "start", value: "seq" },
      { text: "추출번호(1)", value: "drwtNo1" },
      { text: "추출번호(2)", value: "drwtNo2" },
      { text: "추출번호(3)", value: "drwtNo3" },
      { text: "추출번호(4)", value: "drwtNo4" },
      { text: "추출번호(5)", value: "drwtNo5" },
      { text: "추출번호(6)", value: "drwtNo6" }
    ],
  }),
  computed: {
  },
  watch: {
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
     
    },
    getRandomNumbers(){
      if(this.num < 1){
        this.$store.dispatch(
          "global/OPEN_DIALOG",
          "0보타 큰 수를 입력하세요."
        );
      }
      this.loading = true;
      service.getRandomNumbers(this.num).then((r) => {
        if(r.data && r.data.code === "0000"){
          this.numbers = [];
          r.data.data.forEach(e => {
            this.numbers.push({
              drwtNo1: e[0],
              drwtNo2: e[1],
              drwtNo3: e[2],
              drwtNo4: e[3],
              drwtNo5: e[4],
              drwtNo6: e[5]
            });
          });
        }

        this.loading = false;
      }).catch((e) => this.loading = false);
    }, 
    setSync (){
      service.setLatestSync().then((r) => {
        if(r.data && r.data.code === "0000"){
          this.$store.dispatch(
            "global/OPEN_DIALOG",
            "동기화 되었습니다."
          );
          this.$parent.$children[1].read();
        }
      });
    }
  },
};
</script>