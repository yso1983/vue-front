<template>
  <div class="text-center">
    <v-dialog
      v-model="noteMail.dialog"
      width="500"
    >
			<v-card>
				<v-toolbar
					color="primary"
					dark
				>발송대상</v-toolbar>
				<v-card-text>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="noteMail.targets"
            :single-select="singleSelect"
            item-key="email"
            show-select
            class="elevation-1"
            disable-sort="false"
            hide-default-footer="true"
            hide-default-header="true"
          >
            <!-- <template v-slot:top>
              <v-switch
                v-model="singleSelect"
                label="Single select"
                class="pa-3"
              ></v-switch>
            </template> -->
          </v-data-table>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
            depressed
						color="green darken-1"
						@click="confirm"
					>발송</v-btn>
					<v-btn
						depressed
						color="darken-1"
						@click="cancel"
					>취소</v-btn>
				</v-card-actions>
			</v-card>

    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MailService from "../services/mail.service";

  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers: [
          { text: "email", value: "email" },
        ], 
        sendCnt: 0
      };
    },
		computed: {
			noteMail(){
        return this.$store.state.global.noteMail;
			}
		},
    created() {
      this.initialize();
    },
		methods: {
      initialize() {
        this.selected = [];
        this.sendCnt = 0;
      },
			async confirm(){
        let noteId = this.$store.state.global.noteMail.targets[0].id;
        this.sendCnt = 0;
        this.selected.forEach(async (el, i) => {
          await MailService.sendNoteMail({
            "from": this.$store.state.auth.user.email,
            "to": el.email,
            "noteId": noteId
          }).then((res) => {
            console.log(i);
            if(res.data.code == "0000") {
              this.sendCnt++;
            } 

            if(this.selected.length == (i + 1)){
              if(this.sendCnt == (i + 1)){
                this.$store.dispatch("global/OPEN_DIALOG", "발송 성공");
              }
              else{
                this.$store.dispatch("global/OPEN_DIALOG", `발송 실패:실패건수 ${i - this.sendCnt + 1}`);
              }
            }
          }).catch(err => {
            this.$store.dispatch("global/OPEN_DIALOG", err);
          });
        });
			},
			cancel(){
				this.$store.dispatch("global/CLOSE_NOTE_MAIL");
			}
		}
  };
</script>