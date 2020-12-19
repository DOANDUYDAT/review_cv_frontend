<template>
  <v-sheet class="pa-4">
    <v-row>
      <v-col cols="9"></v-col>
      <v-col cols="3">
        <v-row>
          <v-col cols="3" class="text-center" align-self="center">
            <v-avatar color="grey darken-1" size="50">
              <v-img src="../../assets/avatar.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <h3>Nguyễn Văn A</h3>
            <span>Thực tập sinh</span>
          </v-col>
        </v-row>
        <v-row align="end">
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-variant</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            1 năm
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-sort-descending</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            Thực tập sinh
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-briefcase-account</v-icon>
          </v-col>
          <v-col cols="5" class="body-2 py-0">
            IT
          </v-col>
          <v-col cols="1" class="py-0">
            <v-icon small>mdi-map-marker</v-icon>
          </v-col>
          <v-col cols="5" class="flex-end py-0 body-2">
            Hà Nội
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="text-center pb-0 text-uppercase">
            <h3>Bạn có muốn</h3>
          </v-col>
          <v-col cols="12" class="text-center py-0">
            <h4>Xem thông tin liên hệ?</h4>
          </v-col>

          <v-col cols="1">
            <v-icon small>mdi-information</v-icon>
          </v-col>
          <v-col cols="11" class="pl-4">
            Bạn hãy review CV này để có thể xem thông tin liên hệ của ứng viên
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="text-center">
            <v-btn @click="reviewCv" depressed outlined color="red">
              Review cv
            </v-btn>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn
              @click="downloadCv"
              v-if="!status"
              depressed
              outlined
              disabled
            >
              Download
            </v-btn>
            <v-btn @click="downloadCv" v-else depressed outlined color="blue">
              Download
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      status: false
    };
  },
  methods: {
    async reviewCv() {
      const result = await this.$swal({
        title: "Bạn có muốn review CV này?",
        html:
          "<hr><br/>Để review CV, bạn hãy download CV và thực hiện review, upload kết quả lên hệ thống trong vòng 24h.<br/>" +
          "(Bạn có thể bị trừ điểm uy tín<br/>nếu vượt quá thời gian quy định)",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy"
      });
      if (result.isConfirmed) {
        this.status = !this.status;
        try {
          await this.$swal({
            title: "Thành công",
            text: "Hãy review CV để xem thông tin liên hệ của ứng viên",
            icon: "success"
          });
        } catch (err) {
          await this.$swal({
            title: "Thất bại",
            text: err,
            icon: "error"
          });
        }
      }
    },
    downloadCv() {
      console.log("download CV");
    }
  }
};
</script>
<style lang="scss" scoped></style>
