<template>
  <v-card id="dnw_list" class="mx-auto text-center mt-2" app>
    <!-- <v-card-title>
      <v-row>
        <v-col cols="12" sm="12" class="pb-0">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ko-kr"
              v-model="date"
              @input="searchMonth(date)"
              type="month"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="pb-2"
      ></v-text-field>
    </v-card-title> -->

    <v-data-table
      id="dnw_details"
      item-key="id"
      :headers="headers"
      :items="details"
      :items-per-page="15"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      class="elevation-1 ml-3 mr-3"
      @click:row="handleClick"
    >
      <template v-slot:top>
        <v-toolbar flat>
           <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ko-kr"
              v-model="date"
              @input="searchMonth(date)"
              type="month"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
          <v-divider class="mx-3" inset vertical></v-divider>
          
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="pb-5"
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.standard_dt`]="{ item }">
        <span>{{ item.standard_dt | formatDate }}</span>
      </template>
      <template v-slot:[`item.amount`]="{ item }">
        <span>{{ item.amount | makeComma }}</span>
      </template>≈
      <template v-slot:[`item.latest_account_amount`]="{ item }">
        <span>{{ item.latest_account_amount | makeComma }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  name: "dnwList",
  data: () => ({
    loading: true,
    search: '',
    headers: [
      {
        text: "Owner",
        align: "start",
        //sortable: false,
        value: "user_name",
      },
      { text: "계좌", value: "account_name" },
      { text: "지출항목", value: "dnw_item_name" },
      { text: "지출액", value: "amount" },
      { text: "지출일자", value: "standard_dt" },
      { text: "지출후금액", value: "latest_account_amount" },
      { text: "비고", value: "remark" },
    ],
    date: new Date().toISOString().substr(0, 7),
    menu: false,
  }),
  computed: {
    details() {
      return this.$store.state.dnw.details;
    },
  },
  methods: {
    handleClick(value) {
      // this.$store.dispatch("global/CHANGE_ACCOUNT", new Account(value.id, value.user_id, value.name
      // , value.amount, value.remark));
    },
    getDetails() {
      this.loading = true;
      this.$store
        .dispatch("dnw/details", this.date)
        .then(
          (res) => {
            // if (res.code === "3100") {
            //   this.$store.dispatch("auth/logout");
            //   this.$router.push({ name: "LoginPage" });
            // }

            if (res.code === "0000") {
              this.loading = false;
              //this.dwnitems = res.data;
            }
            else if (res.code === "3100"){
              this.$store.dispatch("auth/refresh")
              .then(
                () => {
                  this.getDetails();
                },
                (error) => {
                  this.$store.dispatch("auth/logout");
                  this.$router.push({ name: "LoginPage" });
                }
              );
            }
          },
          (error) => {
            alert(error.message);
          }
        )
        .catch((err) => alert(err.message));
    },
    searchMonth(date) {
      this.$refs.menu.save(date);
      this.getDetails();
    },
  },
  created() {
    this.getDetails();
  },
};
</script>