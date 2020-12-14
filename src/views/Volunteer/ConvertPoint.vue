<template>
  <v-container v-if="currentUser">
    <v-card>
      <v-toolbar class="px-8" dark flat>
        <v-card-title class="layout">
          <span class="headline">Đổi điểm tích lũy</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="px-16 pt-8">
        <v-row>
          <v-col cols="12">
            <h2 class="font-weight-regular">
              Số điểm tích lũy hiện tại của bạn là:
              {{ currentUser.accumulationPoint }} điểm
            </h2>
          </v-col>
          <v-col cols="12">
            <h2 class="font-weight-regular">
              Có hai hình thức lựa chọn đổi điểm:
            </h2>
          </v-col>
          <v-col cols="12">
            <h2 class="font-weight-regular">- Đổi sang điểm uy tín</h2>
          </v-col>
          <v-col cols="12">
            <h2 class="font-weight-regular">- Đổi sang điểm thưởng</h2>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-card-actions class="px-16 pb-8">
            <v-btn rounded color="#007ddd" class="white--text px-4" v-on="on">
              Đổi điểm
            </v-btn>
          </v-card-actions>
        </template>
        <v-card>
          <v-toolbar dark flat>
            <v-card-title class="layout justify-center">
              <span class="headline">Đổi điểm tích lũy</span>
            </v-card-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="4" class="pt-8">
                <h3 class="font-weight-medium">
                  Loại điểm quy đổi
                </h3>
              </v-col>
              <v-col cols="4" class="pt-8">
                <v-select
                  :items="items"
                  v-model="categorySelected"
                  label="Select"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <h2 class="font-weight-medium">
                  Tùy chọn số điểm
                </h2>
              </v-col>
              <v-col cols="10">
                <v-slider
                  v-model="slider"
                  class="align-center"
                  :max="currentUser.accumulationPoint"
                  :min="0"
                  hide-details
                  thumb-label="always"
                  :thumb-size="24"
                >
                </v-slider>
              </v-col>
              <v-col cols="2">{{ currentUser.accumulationPoint }} điểm</v-col>
              <v-col cols="2"></v-col>
              <v-col cols="3" class="">
                <v-text-field
                  v-model="slider"
                  label="0 điểm"
                  single-line
                  outlined
                  type="number"
                  :max="currentUser.accumulationPoint"
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="text-center pt-8">
                <v-icon>mdi-swap-horizontal-bold</v-icon>
              </v-col>
              <v-col cols="3" class="">
                <v-text-field
                  v-model="slider"
                  label="0 điểm"
                  single-line
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                Sử dụng thanh trượt để chọn điểm đổi hoặc nhập số điểm muốn quy
                đổi
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirm">
              Xác nhận
            </v-btn>
            <v-btn color="blue darken-1" text @click="close">
              Hủy bỏ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import volunteerService from "@/api/volunteer";
import authService from "@/api/authentication";
export default {
  data: () => ({
    dialog: false,
    items: [
      {
        text: "Điểm uy tín",
        value: 1
      },
      {
        text: "Điểm thưởng",
        value: 2
      }
    ],
    slider: 0,
    currentUser: null,
    categorySelected: null
  }),
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.viewedItem = Object.assign({}, this.defaultItem);
        this.viewedIndex = -1;
      }, 300);
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      const volunteer = await volunteerService.getVolunteer(userId);
      this.currentUser = volunteer;
    },
    async confirm() {
      try {
        await volunteerService.exchangePoint(
          this.currentUser._id,
          this.slider,
          this.categorySelected
        );
        this.$swal({
          title: "Exchane point successfully!",
          icon: "success"
        });
        this.getData();
      } catch (err) {
        this.$swal({
          title: "Exchane point failed!",
          text: err,
          icon: "error"
        });
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>
