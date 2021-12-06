<template>
  <v-row id="dnw_item_from" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-icon dark v-bind="attrs" v-on="on"> mdi-plus</v-icon>
      </template>
      <v-card v-if="dialog">
        <input type="hidden" v-model="currentItem.id" />
        <validation-observer ref="obsItem" v-slot="{ invalid }">
          <v-card-title>
            <span class="text-h5">지출 항목</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="항목"
                    rules="required"
                  >
                    <v-text-field
                      v-model="currentItem.name"
                      :error-messages="errors"
                      label="item name*"
                      hint="지출 항목 명을 입력하세요."
                      name="항목"
                      persistent-hint
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="비고"
                    rules="max:200"
                  >
                    <v-textarea
                      solo
                      v-model="currentItem.remark"
                      :error-messages="errors"
                      name="비고"
                      :counter="200"
                      label="비고"
                      outlined
                      rows="2"
                      row-height="20"
                    ></v-textarea>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="save" :disabled="invalid">
              Save
            </v-btn>
          </v-card-actions>
        </validation-observer>
      </v-card>
    </v-dialog>
  </v-row>
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

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

import DnwService from "../../services/dnw.service";
import item from "../../models/dnw.item";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    currentItem: new item("", ""),
    dialog: false,
  }),
  methods: {
    save() {
      
      this.$refs.obsItem.validate();
      DnwService.setItem(this.currentItem).then((res) => {
        if (res.data) {
          if (res.data.code === "0000") {
            if (res.data.data)
              this.$store.dispatch("dnw/setItem", res.data.data);

            
          } else {
            alert(res.data.message);
          }
        }

        this.clear();
      });
    },
    close(){
      this.clear();
      this.dialog = false;
    },
    clear() {
      this.currentItem = new item("", "");
      this.dialog = false;
      this.$refs.obsItem.reset();
    },
  },
  created(){
    console.log(this.$refs);
  }
};
</script>