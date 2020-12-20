<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="9">
        <v-sheet class="pa-4">
          <h2 class="font-weight-medium">Danh sách kết quả review CV</h2>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="6">
              <v-row @click="goToReviewResult">
                <v-col
                  cols="3"
                  class="pr-0 py-0 text-center"
                  align-self="center"
                >
                  <v-avatar color="grey darken-1" size="70">
                    <v-img src="../../assets/avatar.jpg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="9" class="pl-0 py-0">
                  <h5>CV được review bởi</h5>
                  <h4>Chuyên gia Nguyễn Văn A</h4>
                  <v-row align="end">
                    <v-col cols="1" class="py-0">
                      <v-icon small>mdi-domain</v-icon>
                    </v-col>
                    <v-col cols="11" class="py-0">
                      Công ty Viettel
                    </v-col>
                    <v-col cols="1" class="py-0">
                      <v-icon small>mdi-web</v-icon>
                    </v-col>
                    <v-col cols="11" class="py-0">
                      viettel.vn
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </v-sheet>
      </v-col>
      <v-col cols="3" class="pl-0">
        <v-sheet min-height="70vh"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToReviewResult() {
      this.$router.push({ name: "Review Result" });
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "@/variables.scss";
// .container {
//   background-color: white;
// }
</style>
