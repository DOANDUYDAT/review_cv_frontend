<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      :sort-asc="[true]"
      :search="search"
      v-if="users"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Danh sách đăng ký mới</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            color="blue"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click.stop="editItem(item)" color="blue"
          >mdi-pencil</v-icon
        >
      </template>
      <template v-slot:[`item.isAccept`]="{ item }">
        <v-chip :color="getColor(item.isAccept)" dark>Đang xử lý</v-chip>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px" v-if="editedItem">
      <v-card>
        <v-toolbar color="blue" dark flat>
          <v-card-title class="layout justify-center">
            <span class="headline">Thông tin tài khoản cộng tác viên</span>
          </v-card-title>
          <v-btn color="blue" text @click="close"
            ><v-icon color="white" dark>
              mdi-close
            </v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.user.fullName"
                  label="Fullname"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.user.userName"
                  label="Username"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.user.email"
                  label="Email"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedItem.user.phone"
                  label="Số điện thoại"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" outlined @click="accept">Phê duyệt</v-btn>
          <v-btn color="grey" outlined @click="decline">Từ chối</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import userService from "@/api/user";
import volunteerService from "@/api/volunteer";

export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Fullname",
        value: "fullName",
        sortable: true
      },
      {
        text: "Username",
        value: "user.userName",
        sortable: true
      },
      {
        text: "Email",
        value: "user.email",
        sortable: true
      },
      {
        text: "Số điện thoại",
        value: "user.phone",
        sortable: true
      },
      {
        text: "Trạng thái",
        value: "isAccept",
        sortable: false
      },
      {
        text: "Hành động",
        align: "center",
        value: "action",
        sortable: false
      }
    ],
    users: null,
    editedIndex: -1,
    editedItem: null
  }),

  computed: {
    // formTitle() {
    //   return (this.editedIndex = "Edit User Role");
    // }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getData();
  },

  methods: {
    decline() {
      this.close();
    },
    getData() {
      volunteerService
        .getListNewVolunteers()
        .then(listVolunteers => {
          this.users = listVolunteers;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = null;
        this.editedIndex = -1;
      }, 300);
    },
    save() {},
    getColor(isAccept) {
      if (!isAccept) return "orange";
    },
    accept() {
      volunteerService
        .accept(this.editedItem._id)
        .then(volunteer => {
          this.close();
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
