<template>
  <div v-if="currentUser" elevation="8">
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
        size="132"
        style="position: absolute; top: -66px; left: 100px; z-index: 10"
      >
        <v-img src="../../assets/avatar.jpg"></v-img>
      </v-avatar>
      <ValidationObserver>
        <v-card
          :width="$vuetify.breakpoint.xs ? '100%' : '50%'"
          class="pa-10 mx-auto"
          flat
        >
          <v-form>
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
                type="username"
                prepend-icon="mdi-account"
              ></v-text-field>
              <span class="red--text text--lighten-1">{{ errors[0] }}</span>
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
                prepend-icon="mdi-email"
                readonly
              ></v-text-field>
              <span class="red--text text--lighten-1">{{ errors[0] }}</span>
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
                type="phone"
                prepend-icon="mdi-phone"
              ></v-text-field>
              <span class="red--text text--lighten-1">{{ errors[0] }}</span>
            </ValidationProvider>
            <!-- <ValidationProvider
          mode="aggressive"
          name="Password"
          rules="required|alpha_dash|min:6"
          v-slot="{ errors }"
          :bails="false"
        >
          <v-text-field
            :type="form.showPassword ? 'text' : 'password'"
            v-model="form.password"
            label="Password"
            counter="16"
            prepend-icon="mdi-lock"
            :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="form.showPassword = !form.showPassword"
          ></v-text-field>
          <span class="red--text text--lighten-1">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          mode="aggressive"
          name="Confirm Password"
          rules="required|alpha_dash|min:6|confirmed:@Password"
          v-slot="{ errors }"
          :bails="false"
        >
          <v-text-field
            :type="form.showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            v-model="form.confirmPassword"
            counter="16"
            prepend-icon="mdi-lock"
            :append-icon="form.showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="form.showConfirmPassword = !form.showConfirmPassword"
          ></v-text-field>
          <span class="red--text text--lighten-1">{{ errors[0] }}</span>
        </ValidationProvider> -->
          </v-form>

          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="UpdateVolunteerProfile"
              >Cập nhật</v-btn
            >
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import volunteerService from "../../api/volunteer";
import authService from "../../api/authentication";
export default {
  data: () => ({
    // form: {},
    currentUser: null
  }),
  methods: {
    async UpdateVolunteerProfile() {
      await volunteerService.updateVolunteerInfo(
        this.currentUser._id,
        this.currentUser
      );
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
      const data = await volunteerService.getVolunteer(userId);
      this.currentUser = data;
      // this.form = data.user;
      // this.form.email = user.email;
      // this.form.phone = user.phone;
      // this.form.username = user.username;
    }
  },
  created() {
    this.getData();
  }
};
</script>
