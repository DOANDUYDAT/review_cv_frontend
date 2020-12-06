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
            <v-toolbar color="blue" dark flat>
              <v-card-title class="layout justify-center">
                <span class="headline">Thông tin tài khoản cộng tác viên</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="viewedItem.id"
                      label="Id"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="viewedItem.userName"
                      label="Username"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="viewedItem.email"
                      label="Email"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="viewedItem.phone"
                      label="Phone"
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" text @click="close">Cancel</v-btn>
              <!-- <v-btn color="it-blue-lighten" text @click="save">Save</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon small class="mr-2" @click.stop="viewItem(item)" color="blue"
        >mdi-eye</v-icon
      >
      <v-icon small @click.stop="deleteItem(item)" color="red"
        >mdi-trash-can-outline</v-icon
      >
    </template>
    <template v-slot:[`item.isActive`]="{ item }">
      <v-switch
        v-model="item.isActive"
        color="green"
        inset
        :label="getActiveLabel(item.isActive)"
        @change="onSwitchChange"
      ></v-switch>
    </template>
  </v-data-table>
</template>

<script>
// import userService from "@/api/user";
// import messageService from "@/api/message";

export default {
  data: () => ({
    dialog: false,
    search: "",
    isActive: ["Active", "Inactive"],
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
    users: [
      {
        id: "001",
        userName: "Le Thanh",
        email: "lethanh98@gmail.com",
        phone: "0123456789",
        isActive: true
      },
      {
        id: "002",
        userName: "Duong Thoa",
        email: "duongthoa98@gmail.com",
        phone: "0123445566",
        isActive: true
      },
      {
        id: "003",
        userName: "Doan Dat",
        email: "doandat98@gmail.com",
        phone: "0336221717",
        isActive: false
      }
    ],
    viewedIndex: -1,
    viewedItem: {
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
    async getData() {
      // const allUsers = await messageService.get("5f9e28eb3d777911e3d78765", {
      //   query: {}
      // });
      // const allUsers = await messageService.find({
      //   query: {
      //     authorId: "5f9c36c9412dbc1f216dcfae"
      //   }
      // });
      // this.users = allUsers;
    },
    viewItem(item) {
      this.viewedIndex = this.users.indexOf(item);
      this.viewedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.users.indexOf(item);
      this.$swal({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, , delete this user!"
      }) && this.users.splice(index, 1);
    },
    onSwitchChange() {
      this.$swal({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.viewedItem = Object.assign({}, this.defaultItem);
        this.viewedIndex = -1;
      }, 300);
    },
    getActiveLabel(isActive) {
      if (isActive) return "Active";
      else return "Inactive";
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
