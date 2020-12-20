<template>
  <v-container class="d-flex flex-column justify-center screen--full bg" fluid>
    <ValidationObserver v-slot="{ invalid }">
      <v-card :width="widthCard" class="pa-10 mx-auto">
        <v-toolbar dark flat>
          <v-card-title class="layout justify-center">
            <span class="headline">Đăng ký làm thành viên</span>
          </v-card-title>
        </v-toolbar>

        <v-form>
          <ValidationProvider
            mode="aggressive"
            name="Fullname"
            rules="required"
            v-slot="{ errors }"
            :bails="false"
          >
            <v-text-field
              v-model="form.fullName"
              label="Fullname"
              type="text"
              prepend-icon="mdi-account"
            ></v-text-field>
            <span class="red--text text--lighten-1">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            mode="aggressive"
            name="Username"
            rules="required"
            v-slot="{ errors }"
            :bails="false"
          >
            <v-text-field
              v-model="form.userName"
              label="Username"
              type="text"
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
          <ValidationProvider
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
              :append-icon="
                form.showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
              "
              @click:append="
                form.showConfirmPassword = !form.showConfirmPassword
              "
            ></v-text-field>
            <span class="red--text text--lighten-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </v-form>

        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" @click="SignUpMember" :disabled="invalid"
            >Đăng ký</v-btn
          >
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>
<script>
import memberService from "../api/member";
export default {
  name: "SignUpMember",
  components: {
    // HelloWorld
  },
  data: () => ({
    form: {
      fullName: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false
    }
  }),
  computed: {
    widthCard() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "60%";
        case "lg":
          return 500;
        case "xl":
          return 500;
        default:
          return "100%";
      }
    }
  },
  methods: {
    SignUpMember() {
      const { fullName, userName, password, email, phone } = this.form;
      const data = {
        fullName,
        userName,
        password,
        email,
        phone
      };
      memberService
        .createMember(data)
        .then(response => {
          this.$router.push({ name: "Login" });
          console.log(response);
          this.$swal({
            position: "center",
            icon: "success",
            title: "Đăng ký thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal("error: ", err.message, "error");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.screen--full {
  height: 100vh;
}
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
.bg {
  background-image: url("../assets/background.jpg");
  background-size: cover;
}
</style>
