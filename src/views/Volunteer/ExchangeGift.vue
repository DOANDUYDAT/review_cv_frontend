<template>
  <v-container>
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
              Số điểm thưởng hiện tại của bạn là: 50 điểm
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="item in giftsList"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              v-if="item.id"
              hover
              height="100%"
              :max-width="maxWidthItem"
              flat
              exact
            >
              <!-- eager giúp force các ảnh được load hết -->
              <v-img
                :height="heightImage"
                :src="item.images.length ? item.images[0].image : ''"
                contain
                eager
              ></v-img>

              <!-- <v-card-text class="py-0">

                <p class="mb-0">{{ product.name }}</p>
                <div class="py-2 font-weight-black">
                  {{ formatCurrency(product.price) }}đ
                </div>
              </v-card-text> -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" disabled text>điểm</v-btn>
                <v-btn color="blue" text @click="exchangeGift">Đổi quà</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    giftsList: []
  }),
  components: {
    // HelloWorld
  },
  methods: {
    exchangeGift() {
      console.log("echangeGift");
    }
  }
};
</script>
<style lang="scss" scoped>
.v-toolbar {
  background-image: linear-gradient(0.25turn, #00bda0 30%, #007ddd);
}
</style>
