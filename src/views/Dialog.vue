<template>
  <div class="text-center">
    <v-dialog
      v-model="msgdialog.dialog"
      width="500"
    >
			<v-card>
				<v-toolbar
					color="primary"
					dark
				>메시지</v-toolbar>
				<v-card-text>
					<div class="text-h6 pa-6">{{msgdialog.message}}</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
						text
						color="green darken-1"
						@click="confirm"
					>확인</v-btn>
				</v-card-actions>
			</v-card>

    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    data () {
			return {
				
			};
    },
		computed: {
			msgdialog(){
				return this.$store.state.global.messageDialog;
			}
		},
		methods: {
			confirm(){
				this.$store.dispatch("global/CLOSE_DIALOG");
			}
		}
  };
</script>