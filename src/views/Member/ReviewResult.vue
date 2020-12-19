<template>
  <v-container>
    <v-sheet class="pa-4">
      <v-row>
        <v-col cols="9"></v-col>
        <v-col cols="3">
          <v-row>
            <v-col cols="4" class="text-center" align-self="center">
              <v-avatar color="grey darken-1" size="70">
                <v-img src="../../assets/avatar.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <h4>CV được review bởi</h4>
              <h4>Chuyên gia</h4>
              <h3>Nguyễn Văn A</h3>
            </v-col>
          </v-row>
          <v-row align="end">
            <v-col cols="1">
              <v-icon small>mdi-domain</v-icon>
            </v-col>
            <v-col cols="5" class="body-2">
              Công ty Viettel
            </v-col>
            <v-col cols="1">
              <v-icon small>mdi-map-marker</v-icon>
            </v-col>
            <v-col cols="5" class="body-2">
              Hà Nội
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="text-center pb-0 text-uppercase">
              <h3>Bạn có muốn</h3>
            </v-col>
            <v-col cols="12" class="text-center py-0">
              <h4>Public thông tin liên hệ?</h4>
            </v-col>
            <v-col cols="1">
              <v-icon small>mdi-information</v-icon>
            </v-col>
            <v-col cols="11" class="pl-4">
              Nhà tuyển dụng có thể xem được thông tin liên hệ của bạn nếu bạn
              xác nhận public CV
            </v-col>
            <v-col cols="12" class="pt-0 text-center">
              <v-btn @click="publicCv" depressed outlined color="red">
                Public cv
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="1">
              <v-icon color="amber">mdi-star</v-icon>
            </v-col>
            <v-col
              cols="11"
              class="pl-6 py-0 text-uppercase"
              align-self="center"
            >
              <h4>Đánh giá kết quả review</h4>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-radio-group v-model="radioGroup" class="mt-0">
                <v-radio label="Hài lòng" value="radio-1"></v-radio>
                <v-radio label="Bình thường" value="radio-2"></v-radio>
                <v-radio label="Không hài lòng" value="radio-3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="pt-0 text-center">
              <v-btn @click="rating" depressed outlined color="blue">
                Đánh giá
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="2" class="py-0">
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">
                    mdi-message-text
                  </v-icon>
                </template>
                <span>Bắt đầu trò chuyện</span>
              </v-tooltip> -->
              <v-btn small text fab>
                <v-icon>mdi-message-text</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10" class="py-0 text-uppercase" align-self="center">
              <h4>Bắt đầu trò chuyện</h4>
            </v-col>
            <v-col cols="2" class="py-0">
              <v-btn small text fab>
                <v-icon>mdi-message-alert-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="10" class="py-0 text-uppercase" align-self="center">
              <h4>Báo cáo</h4>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      status: false,
      radioGroup: null
    };
  },
  methods: {
    async publicCv() {
      const result = await this.$swal({
        icon: "question",
        title: "Bạn có muốn public CV này?",
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
            title: "Public CV thành công",
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
    rating() {
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Đánh giá kết quả review thành công",
        showConfirmButton: false,
        timer: 1500
      });
    },
    downloadCv() {
      console.log("download CV");
    }
  }
};
</script>
<style lang="scss" scoped></style>
