<template>
  <v-container class="mt-4">
    <div v-if="currentUser">
      <v-row>
        <v-col cols="8" class="mx-0">
          <div>
            <v-img
              max-height="200"
              max-width="100%"
              src="../../assets/profile.png"
            ></v-img>
          </div>
          <div style="position: relative; background-color:white">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="110"
              style="position: absolute; top: -55px; left: 60px; z-index: 2"
            >
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
            <ValidationObserver>
              <v-card
                :width="$vuetify.breakpoint.xs ? '100%' : '60%'"
                class="pa-10 mx-auto"
                flat
              >
                <v-form>
                  <ValidationProvider
                    mode="aggressive"
                    name="Fullname"
                    rules="required"
                    v-slot="{ errors }"
                    :bails="false"
                  >
                    <v-text-field
                      v-model="currentUser.user.fullName"
                      label="Fullname"
                      type="text"
                      prepend-icon="mdi-account-details"
                    ></v-text-field>
                    <span class="red--text text--lighten-1">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    mode="aggressive"
                    name="Username"
                    rules="required"
                    v-slot="{ errors }"
                    :bails="false"
                  >
                    <v-text-field
                      v-model="currentUser.user.userName"
                      label="Username"
                      type="text"
                      prepend-icon="mdi-account"
                    ></v-text-field>
                    <span class="red--text text--lighten-1">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    mode="aggressive"
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                    :bails="false"
                  >
                    <v-text-field
                      v-model="currentUser.user.email"
                      label="Email"
                      type="email"
                      readonly
                      prepend-icon="mdi-email"
                    ></v-text-field>
                    <span class="red--text text--lighten-1">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                  <ValidationProvider
                    mode="aggressive"
                    name="Phone number"
                    :rules="{ required: true, regex: /^(0|\+84)[0-9]{9}$/ }"
                    v-slot="{ errors }"
                    :bails="false"
                  >
                    <v-text-field
                      v-model="currentUser.user.phone"
                      label="Phone number"
                      type="text"
                      prepend-icon="mdi-phone"
                    ></v-text-field>
                    <span class="red--text text--lighten-1">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                  <ValidationProvider>
                    <v-autocomplete
                      v-model="currentUser.user.fields"
                      :items="fieldsData"
                      filled
                      chips
                      prepend-icon="mdi-briefcase"
                      background-color="white"
                      label="Select filed"
                      item-text="name"
                      item-value="name"
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content
                            v-text="data.item"
                          ></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </ValidationProvider>
                </v-form>

                <v-card-actions class="d-flex justify-end">
                  <v-btn color="primary" @click="UpdateVolunteerProfile"
                    >Cập nhật</v-btn
                  >
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </div>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title class="layout justify-center">
              <h5>Cài đặt thông báo qua email</h5>
            </v-card-title>
            <v-card-text>
              <span>- Email thông báo từ hệ thống</span><br />
              <template>
                <v-switch
                  v-model="currentUser.user.getEmailNotification"
                  color="green"
                  inset
                  :label="getActiveLabel(currentUser.user.getEmailNotification)"
                  @change="onSwitchChange"
                ></v-switch>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";
import userService from "@/api/user";
export default {
  data: () => ({
    fieldsData: [
      { name: "An toàn lao động" },
      { name: "Bất động sản" },
      { name: "Bưu chính - Viễn thông" },
      { name: "Công nghệ thông tin" },
      { name: "Dệt may/Da giày" },
      { name: "Điện tử viễn thông" },
      { name: "Du lịch" },
      { name: "Kế toán/Kiểm toán" },
      { name: "Luật/Pháp lý" },
      { name: "Quản lý điều hành" }
    ],
    currentUser: null
  }),
  methods: {
    async UpdateVolunteerProfile() {
      const {
        _id,
        userId,
        user: { phone, fullName, userName, getEmailNotification, fields }
      } = this.currentUser;
      await volunteerService.updateVolunteerInfo({
        _id,
        userId,
        phone,
        fullName,
        userName,
        getEmailNotification,
        fields
      });
      await authService.reAuthenticate();
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Cập nhật thông tin thành công",
        showConfirmButton: false,
        timer: 1500
      });
      await this.getData();
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
      // this.form.email = user.email;
      // this.form.phone = user.phone;
      // this.form.username = user.username;
    },
    async onSwitchChange() {
      if (this.currentUser.user.getEmailNotification) {
        try {
          await userService.turnOnNotify(this.currentUser.user._id);
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Bật thông báo thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Bật thông báo thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
        await this.getData();
      } else {
        try {
          await userService.turnOffNotify(this.currentUser.user._id);
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Tắt thông báo thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Tắt thông báo thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
        await this.getData();
      }
    },
    getActiveLabel(status) {
      if (status) return "Trạng thái nhận thông báo đang bật";
      else return "Trạng thái nhận thông báo đang tắt";
    },
    remove(item) {
      const index = this.currentUser.user.fields.indexOf(item.name);
      if (index >= 0) this.currentUser.user.fields.splice(index, 1);
    }
  },
  created() {
    this.getData();
  }
};
</script>
