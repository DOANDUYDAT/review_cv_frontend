<template>
  <v-sheet class="pa-4">
    <h2 class="font-weight-medium">Danh sách CV đã nhận review</h2>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="2" class="text-center">
        <v-avatar color="grey darken-1" size="100">
          <v-img src="../../assets/avatar.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9" class="py-0">
            <h3>Nguyễn Văn A</h3>
            <span>Lĩnh vực làm việc: IT</span><br />
            <span>Cấp bậc: Trưởng/Phó phòng</span><br />
            <span>Địa điểm: Hà Nội</span><br />
            <span>Kinh nghiệm: </span>
            <span class="green--text">Dưới 1 năm</span>
          </v-col>
          <v-col cols="3" class="py-0 text-center">
            <v-row>
              <v-col cols="12" class="py-0 text-center">
                <h4>Upload kết quả review</h4>
              </v-col>
              <v-col class="py-0">
                <form
                  action="http://localhost:3030/uploads"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <v-img
                    class="mx-auto mb-2"
                    src="../../assets/cv1.png"
                    hight="35%"
                    width="35%"
                    style="position: relative;"
                  >
                    <v-file-input
                      hide-input
                      prepend-icon="mdi-card-outline"
                      style="position: absolute; top: 7px; left: 26px; z-index: 10"
                      v-model="file"
                    >
                    </v-file-input>
                  </v-img>
                  <v-btn color="#0da1ec" small outlined @click="upLoadReview">
                    Submit
                  </v-btn>
                </form>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>
<script>
import reviewService from "@/api/review";
export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    async upLoadReview() {
      const res = await reviewService.uploadReview(this.file);
      console.log(res);
    }
  }
};
</script>
<style lang="scss" scoped></style>
