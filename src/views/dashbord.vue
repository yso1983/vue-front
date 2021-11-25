<template>
  <div id="dashbord">
    <v-carousel 
		cycle
		:show-arrows="true">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  // created() {
  //   this.$axios.get("/api/auth/signin").then((res) => {
  //     const user = res.data.data;

  //     console.log(user);
  //     if (user) {
  //       this.$store.dispatch("SET_USER", user);
  //     } 
  //     else{
  //       this.$router.push({
  //         name: "LoginPage"
  //       });
  //     }

  //   }).catch((err) => {
  //     console.error(err);
  //   });
  // },
};
</script>


