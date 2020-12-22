<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :sort-asc="[true]"
    :search="search"
    v-if="users"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách tài khoản chuyên gia</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="500px" v-if="userSelected">
          <v-card>
            <v-toolbar color="blue" dark flat>
              <v-card-title class="layout justify-center">
                <span class="headline">Thông tin tài khoản chuyên gia</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.user.fullName"
                      label="Fullname"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.user.userName"
                      label="Username"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.user.email"
                      label="Email"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.user.phone"
                      label="Phone"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.company"
                      label="Công ty"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="userSelected.websiteCompany"
                      label="Website công ty"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="grey--text pb-0">
                    <span disabled>Lĩnh vực quan tâm</span>
                  </v-col>
                  <v-col cols="12" class="grey--text pt-0">
                    <span v-for="(fi, i) in userSelected.fields" :key="i"
                      >{{ fi }}
                    </span>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" text @click="close">Hủy bỏ</v-btn>
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
    </template>
    <template v-slot:[`item.user.isActive`]="{ item }">
      <v-switch
        v-model="item.user.isActive"
        color="green"
        inset
        :label="getActiveLabel(item.user.isActive)"
        @change="onSwitchChange(item)"
      ></v-switch>
    </template>
  </v-data-table>
</template>

<script>
/* eslint-disable no-unused-vars */
import userService from "@/api/user";
import specialistService from "@/api/specialist";

export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Fullname",
        value: "user.fullName",
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
        value: "user.isActive",
        sortable: true
      },
      {
        text: "Hành động",
        align: "center",
        value: "action",
        sortable: false
      }
    ],
    users: null,
    viewedIndex: -1,
    userSelected: null
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
      const allUsers = await specialistService.getListAcceptedSpecialists();
      this.users = allUsers;
    },
    viewItem(item) {
      this.viewedIndex = this.users.indexOf(item);
      this.userSelected = Object.assign({}, item);
      this.dialog = true;
    },
    async onSwitchChange(specialist) {
      const result = await this.$swal({
        title: "Bạn có chắc không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ"
      });
      if (result.isConfirmed) {
        if (specialist.user.isActive) {
          try {
            await userService.activeUser(specialist.user._id);
            await this.$swal({
              title: "Mở khóa tài khoản thành công!",
              icon: "success"
            });
          } catch (err) {
            await this.$swal({
              title: "Mở khóa tài khoản thất bại!",
              text: err,
              icon: "error"
            });
          }
          await this.getData();
        } else {
          try {
            await userService.deactiveUser(specialist.user._id);
            await this.$swal({
              title: "Khóa tài khoản thành công!",
              icon: "success"
            });
          } catch (err) {
            await this.$swal({
              title: "Khóa tài khoản thất bại!",
              text: err,
              icon: "error"
            });
          }
          await this.getData();
        }
      }
      await this.getData();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.userSelected = null;
        this.viewedIndex = -1;
      }, 300);
    },
    getActiveLabel(isActive) {
      if (isActive) return "Hoạt động";
      else return "Không hoạt động";
    }
  }
};
</script>
