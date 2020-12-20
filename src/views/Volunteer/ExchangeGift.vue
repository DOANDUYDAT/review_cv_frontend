<template>
  <div v-if="currentUser">
    <v-card>
      <v-toolbar class="px-8" dark flat>
        <v-card-title class="layout">
          <span class="headline">Đổi quà</span>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="px-16 pt-8">
        <v-row>
          <v-col cols="12">
            <h2 class="font-weight-regular">
              Số điểm thưởng hiện tại của bạn là:
              {{ currentUser.rewardPoint }} điểm
            </h2>
          </v-col>
        </v-row>
        <v-row v-if="gifts">
          <v-col
            v-for="item in gifts"
            :key="item._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card hover height="100%" exact class="px-4">
              <!-- eager giúp force các ảnh được load hết -->
              <v-card-title class="sub-title text-center">{{
                item.name
              }}</v-card-title>
              <!-- <v-img
                :height="heightImage"
                :src="item.image"
                contain
                eager
              ></v-img> -->
              <v-img
                v-if="item.image"
                :height="heightImage"
                :src="'http://localhost:3030/uploads/' + item.image"
              ></v-img>
              <v-img
                v-else
                :height="heightImage"
                src="../../assets/gift.png"
              ></v-img>
              <v-row>
                <v-col class="pb-0"
                  >Số lượng còn lại:
                  <span class="red--text">{{ item.quantity }}</span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <!-- <v-img
                :height="heightImage"
                src="../../assets/viettel 50.png"
              ></v-img> -->
              <v-card-actions class="d-flex justify-space-around">
                <v-chip class="ma-2" label dark color="green">
                  {{ item.value }} điểm
                </v-chip>
                <v-chip
                  class="ma-2"
                  label
                  dark
                  color="blue"
                  @click="exchangeGift(item)"
                >
                  Đổi quà
                </v-chip>
                <!-- <v-btn color="blue" small dark @click="exchangeGift"
                  >Đổi quà</v-btn
                > -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import giftService from "@/api/gift.js";
import volunteerService from "@/api/volunteer";
import authService from "@/api/authentication";

export default {
  data: () => ({
    gifts: null,
    currentUser: null,
    heightImage: 200,
    maxWidthItem: 100
  }),
  components: {
    // HelloWorld
  },
  methods: {
    async exchangeGift(gift) {
      try {
        await giftService.exchangeGift(gift._id);
        this.$swal({
          title: "Đổi quà thành công!",
          icon: "success"
        });
      } catch (err) {
        this.$swal({
          title: "Đổi quà thất bại!",
          text: err,
          icon: "error"
        });
      }
      this.getData();
    },
    async getData() {
      try {
        this.gifts = await giftService.getAllGifts();
        const userId = await authService.getCurrentUserId();
        const volunteer = await volunteerService.getVolunteer(userId);
        this.currentUser = volunteer;
      } catch (error) {
        console.log(error);
      }
    },
    getImageFromBase64() {
      let image = new Image();
      return image;
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
.v-card__title {
  word-break: break-word;
}
</style>
