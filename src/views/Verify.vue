<template>
  <v-container jutify-center>
    <v-card style="max-width:60%; margin:auto;">
      <v-toolbar flat dark>
        <h2>Xác thực tài khoản</h2>
      </v-toolbar>
      <v-card-title style="justify-content: center;"
        >Bạn đã xác thực tài khoản thành công.
      </v-card-title>
      <v-card-actions style="justify-content: center;">
        <v-btn to="/login">Đăng nhập tại đây</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
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
