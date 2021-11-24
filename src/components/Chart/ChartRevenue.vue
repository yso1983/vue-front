<template>
  <v-card
    class="mx-auto text-center"
    color="green"
    dark
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
					:labels="labels"
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <!-- <template v-slot:label="item">
            ${{ item.value }}
          </template> -->
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
      >
        수익
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      labels: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      value: [
        520,
        446,
        675,
        510,
        590,
        610,
        520,
        560,
        560,
        560,
        560,
        560,
      ],
    })
  };
</script>