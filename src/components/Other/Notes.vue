<template>
  <v-data-table
    :headers="headers"
    :items="notes"
    sort-by="calories"
    class="elevation-1 pa-2"
    :search="search"
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
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-3"
        ></v-text-field>
        <v-divider class="mx-3" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2 mt-2" v-bind="attrs" v-on="on">
              New
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
              <form @submit.prevent="save()">
                <v-card-text>
                  <v-container>
                    <input type="hidden" v-model="editedItem.id" />
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          height="350"
                          outlined
                          v-model="editedItem.remark"
                          label="메모"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    취소
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    type="submit"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.remark`]="{ item }">
      <span @click="editItem(item)">{{ item.remark | strSortData }}</span>
    </template>
    <template v-slot:[`item.created_dt`]="{ item }">
      <span @click="editItem(item)">{{ item.created_dt | formatDate }}</span>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
      <v-icon small @click="sendMail(item)"> mdi-send </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import NoteService from "../../services/note.service";

export default {
  name: "note",
  data: () => ({
    menu2: false,
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: "내용", value: "remark" },
      { text: "수정일자", value: "created_dt" },
      { text: "수정", value: "actions", sortable: false },
    ],
    notes: [],
    editedIndex: -1,
    editedItem: {},
    groupId: "",
    locked: false,
    defaultItem: {
      id: 0,
      remark: "",
      user_yn: "Y"
    },
    disabled: false,
    date: new Date().toISOString().substr(0, 7),
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "신규" : "수정";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.editedItem = this.defaultItem;
      this.getDetails();
    },

    editItem(item) {
      console.log(item);
      this.disabled = true;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.editedItem.use_yn = "N";
      NoteService.setNotes(this.editedItem)
        .then((res) => {
          if (res.data) {
            if (res.data.code === "0000") {
              this.closeDelete();
              this.initialize();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    close() {
      this.dialog = false;
      this.disabled = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let item = this.editedItem;

      if (!item.remark) {
        this.$store.dispatch("global/OPEN_DIALOG", "메모를 입력하세요!");
        return;
      }
      NoteService.setNotes(this.editedItem)
        .then((res) => {
          if (res.data) {
            if (res.data.code === "0000") {
              this.close();
              this.initialize();
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    searchMonth(date) {
      this.$refs.menu.save(date);
      this.getDetails();
    },

    getDetails() {
      NoteService.getNotes(`${this.date}-01`.replace(/-/gi, ""), 100)
        .then((res) => {
          if (res.data) {
            if (res.data.code === "0000") {
              this.notes = res.data.data;
            }
          } else alert("실패");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    sendMail(item){
      this.$store.dispatch("global/OPEN_NOTE_MAIL", item.id);
    }
  },
};
</script>