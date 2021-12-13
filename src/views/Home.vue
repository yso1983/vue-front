<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="총 자산"
          number="343"
          tIcon="mdi-list"
          tIconColor="success"
          bIcon="mdi-cash-multiple"
          bIconColor="success"
          bText="용수 & 봉화"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
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

      <v-flex xs12 sm6 md3 class="pb-2">
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

      <v-flex xs12 sm12 class="pb-2">
        <board-card></board-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import smallCard from '@/components/Home/SmallCard';
import boardCard from '@/components/Home/BoardCard';

export default {
  components: {
    smallCard,
    boardCard,
  }
};
</script>