<template>
  <v-footer absolute padless app dark>
    <v-card flat tile width="100%">
      <v-row>
        <v-col offset="2" cols="2" class="py-0">
          <v-card-text class="py-0">
            <v-avatar size="50" class="mr-10" color="#00bda0">
              <v-img src="@/assets/logo.png"></v-img>
            </v-avatar>
          </v-card-text>
        </v-col>
        <v-col offset="4" cols="2">
          <v-card-text class="py-0">
            <v-row>
              <h4 class="mr-4">Follow us</h4>
              <v-icon class="mr-2">mdi-facebook</v-icon>
              <v-icon class="mr-2">mdi-twitter</v-icon>
              <v-icon class="mr-8">mdi-instagram</v-icon>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col offset="2" cols="3" class="py-0">
          <v-card-text class="py-0">
            <p class="pl-4 subtitle-1">
              Hệ thống hỗ trợ duyệt CV cho tuyển dụng trực tuyến.<br />
              Phân hệ dành cho chuyên gia nhân sự.<br />
              Phân hệ dành cho cộng tác viên.
            </p>
          </v-card-text>
        </v-col>
        <v-col offset="3" cols="4" class="py-0">
          <v-card-text class="py-0">
            <h2>Liên hệ</h2>
            <p class="subtitle-1">
              <v-icon small>mdi-home</v-icon> Bách Khoa Hà Nội<br />
              <v-icon small>mdi-email</v-icon> info@gmail.com<br />
              <v-icon small>mdi-phone</v-icon> +0912345678
            </p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <v-col cols="12" class="text-center">
          <v-card-text class="pt-0"
            >© Copyright 2021 Bản quyền thuộc về CV</v-card-text
          >
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    // icons: [
    //   'mdi-home',
    //   'mdi-email',
    //   'mdi-calendar',
    //   'mdi-delete',
    // ],
    // items: [
    //   'default',
    //   'absolute',
    //   'fixed',
    //   'app'
    // ],
    padless: true,
    variant: "default"
  }),
  computed: {}
};
</script>

<style lang="scss" scoped>
.v-card {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>
