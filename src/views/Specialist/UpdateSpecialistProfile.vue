<template>
  <v-container>
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
                  v-model="form.username"
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
                  v-model="form.email"
                  label="Email"
                  type="email"
                  prepend-icon="mdi-email"
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
                  v-model="form.phone"
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
              <v-btn color="primary" @click="UpdateSpecialistProfile"
                >Cập nhật</v-btn
              >
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </div>
    </div>
  </v-container>
</template>
<script>
import specialistService from "../../api/specialist";
import authService from "../../api/authentication";
export default {
  data: () => ({
    form: {
      username: "",
      email: "",
      phone: ""
    },
    currentUser: null
  }),
  methods: {
    async UpdateSpecialistProfile() {
      await specialistService.updateSpecialistInfo(
        this.currentUser._id,
        this.form
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
      const user = await specialistService.getSpecialist(userId);
      this.currentUser = user;
      this.form.email = user.email;
      this.form.phone = user.phone;
      this.form.username = user.username;
    }
  },
  created() {
    this.getData();
  }
};
</script>
