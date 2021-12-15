<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm4 md4 class="pb-2" v-for="item in items" :key="item.title">
        <small-card
          :title="item.title"
          :number="item.number"
          :tIcon="item.tIcon"
          :tIconColor="item.tIconColor"
          :bIcon="item.bIcon"
          :bIconColor="item.bIconColor"
          :bText="item.bText"
        ></small-card>
      </v-flex>
      <!-- 
      <v-flex xs12 sm4 md4 class="pb-2">
        <small-card
          title="농협 통장 잔고"
          number="36,520,302"
          tIcon="mdi-person"
          tIconColor="primary"
          bIcon="mdi-cash"
          bIconColor="success"
          bText="이달 - 3,500,000"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="금주 사용금액"
          number="431"
          tIcon="mdi-visibility"
          tIconColor="info"
          bIcon="mdi-trending-down"
          bIconColor="error"
          bText="43 감소"
        ></small-card>
      </v-flex> 
      <v-flex xs12 sm4 md4 class="pb-2">
        <small-card
          title="이달 사용금액"
          number="334234"
          tIcon="mdi-view_module"
          tIconColor="warning"
          bIcon="mdi-trending-up"
          bIconColor="success"
          bText="256 증가"
        ></small-card>
      </v-flex>
      -->
      <v-flex xs12 sm12 class="pb-2">
        <board-card></board-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import smallCard from "@/components/Home/SmallCard";
import boardCard from "@/components/Home/BoardCard";

import AccountService from "@/services/account.service";
import HomeService from "@/services/home.service";

export default {
  components: {
    smallCard,
    boardCard,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getTotalAmount() {
      AccountService.getAaccounts().then((res) => {
        if (res.data && res.data.code === "0000") {
          let data = res.data.data;
          if (!(data && data.length > 0)) return;

          this.items.push({
            title: "총 자산",
            number: this.getCurrency(
              data.reduce((previousValue, currentValue) => {
                return {
                  amount:
                    parseFloat(previousValue.amount) +
                    parseFloat(currentValue.amount),
                };
              }).amount
            ),
            tIcon: "mdi-list",
            tIconColor: "success",
            bIcon: "mdi-cash-multiple",
            bIconColor: "success",
            bText: "각자 소돈비 제외",
          });

          let nhAccount = data.filter((acc) => acc.name.indexOf("농협") > -1);
          if (nhAccount && nhAccount.length > 0) {
            this.items.push({
              title: "농협 통장",
              number: this.getCurrency(parseFloat(nhAccount[0].amount)),
              tIcon: "mdi-list",
              tIconColor: "success",
              bIcon: "mdi-plus",
              bIconColor: "success",
              bText: "",
            });
          }
        }
      });
    },

    getDnwThisMonth() {
      HomeService.getDnwThisMonth()
        .then((res) => {
          if (res.data && res.data.code === "0000") {
            let data = res.data.data;
            if (!(data && data.length > 0)) return;

            let thisMonth = data.filter((d) => d.thisYearMonth === d.yearMonth);
            let preMonth = data.filter((d) => d.thisYearMonth !== d.yearMonth);
            console.log(thisMonth, preMonth);
            let thisMonthAmount =
              thisMonth && thisMonth.length > 0
                ? parseFloat(thisMonth[0].total)
                : 0;
            let preMonthAmount =
              preMonth && preMonth.length > 0
                ? parseFloat(preMonth[0].total)
                : 0;

            this.items.push({
              title: "이달 사용금액",
              number: this.getCurrency(0 - thisMonthAmount),
              tIcon:
                thisMonthAmount < preMonthAmount
                  ? "mdi-visibility"
                  : "mdi-view_module",
              tIconColor: "warning",
              bIcon:
                thisMonthAmount < preMonthAmount
                  ? "mdi-trending-up"
                  : "mdi-trending-down",
              bIconColor:
                thisMonthAmount < preMonthAmount ? "error" : "success",
              bText: this.getCurrency(preMonthAmount - thisMonthAmount),
            });
          }
        })
        .catch((err) => {
          this.$store.dispatch("global/OPEN_DIALOG", err.message);
        });
    },

    getCurrency: (fAmount) =>
      ("" + fAmount).replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
  created() {
    this.getTotalAmount();
    this.getDnwThisMonth();
  },
};
</script>