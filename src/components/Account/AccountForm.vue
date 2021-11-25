<template>
  <v-card class="mx-auto text-center" dark app>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <input type="hidden" v-model="$store.state.account.id">
        <validation-provider v-slot="{ errors }" name="select" rules="required">
          <v-select
            v-model="$store.state.account.select"
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
            v-model="$store.state.account.name"
            :counter="25"
            :error-messages="errors"
            label="항목"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="잔액"
          rules="required"
        >
          <v-text-field
            v-model="$store.state.account.amount"
            :error-messages="errors"
            label="잔액"
            type="number"
            min="0"
            step=".1"
            required
          ></v-text-field>
        </validation-provider>
        <v-textarea
          solo
          v-model="$store.state.account.remark"
          name="비고"
          :counter="200"
          label="비고"
          outlined
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
      let account = this.$store.state.account;

      let params = {
        id: account.id,
        name: account.name,
        user_id: account.select,
        remark: account.remark??"",
        amount: account.amount
      };

      console.log(params);

      this.$axios.put("/api/account", params) 
      .then((res) => {
        console.log(res);
        if(res){
          this.clear();
          //console.log(this.$parent);
          this.$parent.$children[1].read();
        }
        else 
          alert("실패");
      })
      .catch((err) => {
        alert(err);
      });

    },
    clear() {
      this.$store.state.account.id = 0;
      this.$store.state.account.name = "";
      this.$store.state.account.amount = 0;
      this.$store.state.account.select = null;
      this.$store.state.account.remark = "";
      this.$refs.observer.reset();
    },
    read() {
      this.$axios.get("/api/user").then((res) => {
        if (res.data && res.data.code === "0000") this.users = res.data.data;
      });
    },
  },
  created() {
    this.read();
  },
};
</script>