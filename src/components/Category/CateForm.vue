<template>
  <v-card class="mx-auto text-center" dark app>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
         <input type="hidden" v-model="$store.state.cate.user_id">
        <validation-provider v-slot="{ errors }" name="select" rules="required">
          <v-select
            v-model="$store.state.cate.select"
            :items="users"
            item-text="name"
            item-value="id"
            :error-messages="errors"
            label="Select Users"
            data-vv-name="select"
            required
          ></v-select>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="항목"
          rules="required|max:25"
        >
          <v-text-field
            v-model="$store.state.cate.name"
            :counter="25"
            :error-messages="errors"
            label="항목"
            required
          ></v-text-field>
        </validation-provider>
        <v-textarea
          solo
          v-model="$store.state.cate.remark"
          name="비고"
          :counter="200"
          label="비고"
          outlined
          required
        ></v-textarea>

        <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>
<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import axios from "axios";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({

    users: []
  }),
  methods: {
    submit() {
      this.$refs.observer.validate();


    },
    clear() {
      this.$store.state.cate.id = 0;
      this.$store.state.cate.name = "";
      this.$store.state.cate.select = null;
      this.$store.state.cate.remark = "";
      this.$refs.observer.reset();
    },
    read() {
      axios.get("/user").then((res) => {
        if (res.data) this.users = res.data;
      });
    },
  },
  created() {
    this.read();
  },
};
</script>