<template>
  <v-sheet class="pa-4">
    <v-row @click="goToCv">
      <v-col cols="2" class="text-center" align-self="center">
        <v-avatar color="grey darken-1" size="100">
          <v-img src="../../assets/avatar.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9">
            <h3>Nguyễn Văn A</h3>
            <span>Lĩnh vực làm việc: IT</span><br />
            <span>Cấp bậc: Trưởng/Phó phòng</span>
            <v-row>
              <v-col cols="6" class="py-0 text-left"
                >Kinh nghiệm:
                <span class="green--text">Dưới 1 năm</span>
              </v-col>
              <v-col cols="6" class="py-0 text-right"
                >Cập nhật 6 ngày trước</v-col
              >
            </v-row>
          </v-col>
          <v-col cols="3" class="text-right"></v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToCv() {
      this.$router.push({
        path: "/volunteerHome/view-cv"
      });
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
