<template>
  <v-container>
    <v-card class="pa-10 mx-auto">
      <v-toolbar flat dark>
        <h2>Tài khoản đang chờ phê duyệt</h2>
      </v-toolbar>
      <v-card-title
        >Chúng tôi đang xem xét thông tin đăng ký của bạn.<br />
        Bạn vui lòng đăng nhập sau khi tài khoản được phê duyệt.
      </v-card-title>
      <v-card-actions>
        <v-btn to="/forums">Đi đến diễn đàn</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>
