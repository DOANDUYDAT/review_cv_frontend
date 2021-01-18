<template>
  <v-container jutify-center>
    <v-card style="max-width:60%; margin:auto;">
      <v-toolbar flat dark>
        <h2>Xác thực tài khoản</h2>
      </v-toolbar>
      <v-card-title v-if="message" style="justify-content: center;"
        >{{ message }}
      </v-card-title>
      <v-card-title v-else style="justify-content: center;">
        Tài khoản đang được xác thực. Vui lòng đợi trong giây lát...
      </v-card-title>
      <v-card-actions style="justify-content: center;">
        <v-btn to="/login">Đăng nhập tại đây</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
/* eslint-disable no-unused-vars */
import feathers from "@/services/socketClient.js";

export default {
  data() {
    return {
      message: null
    };
  },
  created() {
    const token = this.$route.query.token;
    console.log(token);
    const obj = {
      action: "verifySignupLong",
      value: token
    };
    const authManagement = feathers.service("authManagement");
    authManagement
      .create(obj)
      .then(sucess => (this.message = `Xác thực tài khoản thành công`))
      .catch(err => (this.message = err));
  }
};
</script>
<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #1976d2;
}
.theme--light.v-btn {
  color: #f5f5f5;
}
</style>
