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
        <v-toolbar-title>Danh sách tài khoản cộng tác viên</v-toolbar-title>
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
            <v-toolbar color="gg-red" dark flat>
              <v-card-title class="flex-grow-1 justify-center">
                <span class="headline">hi</span>
              </v-card-title>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-row align="center">
                      <v-col cols="3">
                        <v-subheader>
                          <b>Role:</b>
                        </v-subheader>
                      </v-col>
                      <v-col cols="9"> </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="it-blue-lighten" text @click="close">Cancel</v-btn>
              <v-btn color="it-blue-lighten" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon small class="mr-2" @click.stop="viewItem(item)" color="blue"
        >mdi-eye</v-icon
      >
      <v-icon small class="mr-2" @click.stop="editItem(item)" color="green"
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
// import authService from "@/api/authentication";

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
      { text: "Actions", align: "center", value: "action", filterable: false }
    ],
    users: [
      {
        id: "001",
        userName: "Le Thanh",
        email: "lethanh98@gmail.com",
        phone: "0123456789",
        isActive: "Từ chối"
      },
      {
        id: "002",
        userName: "Duong Thoa",
        email: "duongthoa98@gmail.com",
        phone: "0123445566",
        isActive: "Đang xử lý"
      },
      {
        id: "003",
        userName: "Doan Dat",
        email: "doandat98@gmail.com",
        phone: "0336221717",
        isActive: "Đang xử lý"
      }
    ]
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
    async getData() {
      // await authService.reAuthenticate();
      // const allUsers = await userService.find({
      //   query: {
      //     $sort: { createdAt: -1 },
      //     $limit: 25
      //   }
      // });
      // this.users = allUsers;
    },
    viewItem(item) {
      this.viewItem = this.users.indexOf(item);
      this.viewItem = Object.assign({}, item);
      this.dialog = true;
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
