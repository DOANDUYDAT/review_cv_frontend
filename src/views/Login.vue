<template>
  <v-container class="d-flex flex-column justify-center screen--full bg" fluid>
    <ValidationObserver v-slot="{ invalid }">
      <v-card :width="widthCard" class="pa-10 mx-auto">
        <v-toolbar dark flat>
          <v-card-title class="layout justify-center">
            <span class="headline">Đăng nhập</span>
          </v-card-title>
        </v-toolbar>

        <v-form>
          <ValidationProvider
            mode="aggressive"
            name="email"
            rules="required|email"
            v-slot="{ errors }"
            :bails="false"
          >
            <v-text-field
              v-model="form.email"
              prepend-icon="mdi-email"
              label="Email"
              type="email"
            ></v-text-field>
            <span class="red--text text--lighten-1">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            mode="aggressive"
            name="password"
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
              @keyup.enter="login"
            ></v-text-field>
            <span class="red--text text--lighten-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </v-form>

        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" @click="login" :disabled="invalid"
            >Đăng nhập</v-btn
          >
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>
<script>
import authService from "../api/authentication";
export default {
  name: "Login",
  components: {
    // HelloWorld
  },
  data: () => ({
    form: {
      email: "",
      showPassword: false,
      password: ""
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
    login() {
      const data = this.form;
      authService
        .authenticate(data)
        // eslint-disable-next-line no-unused-vars
        .then(user => {
          this.$router.push({ path: "/About" });
          this.$swal({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
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
