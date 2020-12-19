<template>
  <v-container>
    <v-sheet class="pa-4">
      <h2 class="font-weight-medium">Danh sách kết quả review CV</h2>
      <v-divider></v-divider>
      <v-row @click="goToReviewResult">
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
            </v-col>
            <v-col cols="3" class="text-right">
              <v-btn icon @click.stop="interestedCv">
                <v-icon v-if="!heart">mdi-heart-outline</v-icon>
                <v-icon color="red" v-else>mdi-heart</v-icon>
              </v-btn>
              <span class="body-2" :class="{ 'red--text': heart }"
                >Quan tâm</span
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="pt-0 text-left"
              >Kinh nghiệm:
              <span class="green--text">Dưới 1 năm</span>
            </v-col>
            <v-col cols="6" class="pt-0 text-right"
              >Cập nhật 6 ngày trước</v-col
            >
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      heart: false
    };
  },
  methods: {
    goToReviewResult() {
      this.$router.push({ name: "Review Result" });
    },
    async interestedCv() {
      if (!this.heart) {
        this.heart = !this.heart;
        try {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        this.heart = !this.heart;
        try {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thành công!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          await this.$swal({
            toast: true,
            position: "top-end",
            title: "Bỏ quan tâm CV thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
      // this.heart = !this.heart;
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
