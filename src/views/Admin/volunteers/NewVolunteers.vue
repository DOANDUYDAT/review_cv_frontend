<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :sort-by="['id']"
    user-key="id"
    :sort-asc="[true]"
    :search="search"
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
          label="Search"
          color="blue"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
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
                      v-model="editedItem.id"
                      label="Id"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.userName"
                      label="Username"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone"
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
      </v-toolbar>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon small class="mr-2" @click.stop="editItem(item)" color="blue"
        >mdi-pencil</v-icon
      >
      <v-icon small @click.stop="deleteItem(item)" color="red"
        >mdi-trash-can-outline</v-icon
      >
    </template>
    <template v-slot:[`item.isActive`]="{ item }">
      <v-chip :color="getColor(item.isActive)" dark>{{ item.isActive }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
// import userService from "@/api/user";
import volunteerService from "@/api/volunteer";

export default {
  data: () => ({
    dialog: false,
    search: "",
    isActive: ["Đang xử lý", "Từ chối"],
    headers: [
      {
        text: "Id",
        value: "id",
        sortable: false,
        filterable: true
      },
      {
        text: "Username",
        value: "userName",
        sortable: true,
        filterable: false
      },
      { text: "Email", value: "email", sortable: false, filterable: false },
      { text: "Phone", value: "phone", sortable: false, filterable: false },
      { text: "State", value: "isActive", sortable: false, filterable: false },
      {
        text: "Actions",
        align: "center",
        value: "action",
        sortable: false,
        filterable: false
      }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      userName: "",
      email: "",
      phone: 0
    }
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
    getData() {
      volunteerService
        .getAllNewVolunteers()
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
    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this user?") &&
        this.users.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {},
    getColor(isActive) {
      if (isActive == "Từ chối") return "red";
      else return "orange";
    },
    accept() {
      volunteerService
        .accept(this.editedItem.id)
        .then(volunteer => {
          console.log(volunteer);
          this.close();
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // async save() {
  //   const user = this.editedItem;
  //   try {
  //     const isSuccess = await staffService.updateStaff(user);
  //     console.log(isSuccess);
  //     if (isSuccess) {
  //       await this.getData();
  //       this.$store.dispatch("alert/success", {
  //         message: "Update Successfully!"
  //       });
  //       this.close();
  //     }
  //   } catch (error) {
  //     this.$store.dispatch("alert/error", {
  //       message: error
  //     });
  //   }
  // }
};
</script>
