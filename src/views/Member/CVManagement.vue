<template>
  <v-container>
    <v-card>
      <v-card-title class="pt-6">
        <h2 class="teal--text">
          Quản lý CV của bạn
        </h2>
      </v-card-title>
      <v-tabs color="teal accent-4" left>
        <v-tab>Danh sách CV online</v-tab>
        <v-tab>Danh sách CV upload</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="teal" dark>
                  <v-icon left> mdi-plus-circle </v-icon>Tạo mới</v-btn
                >
              </v-col>
            </v-row>

            <v-card>
              <v-row class="px-6 py-3">
                <v-col cols="2">
                  <v-img
                    src="https://picsum.photos/350/165?random"
                    height="125"
                    class="grey darken-4"
                  ></v-img>
                </v-col>
                <v-col cols="10" class="pb-0">
                  <v-row>
                    <v-col cols="9">
                      <h2 class="teal--text font-weight-medium">
                        CV lập trình VueJS
                      </h2>
                    </v-col>
                    <v-col cols="3" class="text-right">
                      12/22/2020, 5:07:38 PM
                      <!-- {{ shortDateTime(item.createdAt) }} -->
                    </v-col>
                    <v-col cols="12">
                      <v-input hide-details="auto">
                        <span class="ma-2"
                          >https://i.topcv.vn/duongthithoa?ref=3389360</span
                        >
                      </v-input>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 text-right" cols="12">
                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-eye-outline </v-icon>Xem</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-download </v-icon>Tải xuống</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="mx-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-lead-pencil </v-icon>Sửa</v-btn
                      >

                      <v-btn
                        small
                        color="#f6f6f6"
                        class="ml-2 grey--text"
                        depressed
                      >
                        <v-icon left> mdi-trash-can </v-icon>Xóa</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="4"
                >vnn
                <!-- <v-img
                  :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                  :lazy-src="
                    `https://picsum.photos/10/6?image=${i * n * 5 + 10}`
                  "
                  aspect-ratio="1"
                ></v-img> -->
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
export default {
  methods: {
    shortDateTime: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleString();
    }
  }
};
</script>
<style lang="scss" scoped>
.v-input {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>
