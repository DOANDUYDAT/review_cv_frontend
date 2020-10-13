<template>
  <v-main>
    <v-container>
      <v-card>
        <div class="text-h5 text-center">
          Đăng nhập
        </div>
        <v-form>
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            outlined
          ></v-text-field>
        </v-form>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" @click="login">Đăng nhập</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>
<script>
import { authenticate } from "../api/authentication";
export default {
  name: "Login",
  components: {
    // HelloWorld
  },
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  methods: {
    login() {
      const data = this.form;
      const user = authenticate(data);
      if (user) {
        //this.$router.push({ name="home" });
      }
    }
  }
};
</script>
