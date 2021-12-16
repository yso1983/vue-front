<template>
  <v-card class="mx-auto">
    <v-toolbar color="orange" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>최근 입출금 내역</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- 
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="item.title">
          <v-list-item-avatar>
            <!-- <v-img :src="item.avatar"></v-img> -->
            <v-icon :color="item.color"> {{item.tag}} </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import DnwService from "@/services/dnw.service";
import moment from "moment";

export default {
  data: () => ({
    items: [
      // { header: "2021-12-13" },
      // {
      //   //avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      //   title: "국민은행(청약)",
      //   subtitle: `<span class="text--primary">건강보험 -2,100 원</span> &mdash; 매월 자동 지출`,
      // },
      // { divider: true, inset: true },
      // {
      //   //avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      //   title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
      //   subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      // },
      // { divider: true, inset: true },
      // {
      //   //avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      //   title: "Oui oui",
      //   subtitle:
      //     '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      // },
      // { divider: true, inset: true },
      // {
      //   //avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      //   title: "Birthday gift",
      //   subtitle:
      //     '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      // },
      // { divider: true, inset: true },
      // {
      //   //avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      //   title: "Recipe to try",
      //   subtitle:
      //     '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      // },
    ],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      DnwService.getPagingDetails(1, 5).then((res) => {
        if (res.data && res.data.code === "0000") {
          let list = res.data.data;
          let headerDate = "";

          list.forEach((e) => {
            console.log(e);

            let date = moment(String(e.standard_dt)).format("YYYY-MM-DD");
            if (headerDate !== date) {
              headerDate = date;
              this.items.push({ header: date });
            }
            this.items.push({
              //avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
              title: e.account.name,
              subtitle: `<span class="text--primary">${
                e.dnw_item.name
              } ${this.getCurrency(parseFloat(e.amount))} 원</span> ${
                e.remark !== "" ? "&mdash; 매월 자동 지출" : ""
              }`,
              color: parseFloat(e.amount) > 0 ? "success" : "error", 
              tag: parseFloat(e.amount) > 0 ? "mdi-plus" : "mdi-minus", 
            });
            this.items.push({ divider: true, inset: true });
          });
        }
      });
    },

    getCurrency: (fAmount) => {
      return ("" + fAmount)
        .replace(/,/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
