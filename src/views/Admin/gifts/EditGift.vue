<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <v-card flat>
        <v-toolbar color="primary" dark flat>
          <v-card-title>
            <span class="headline">Chỉnh sửa quà tặng</span>
          </v-card-title>
        </v-toolbar>
        <v-row>
          <v-col cols="8">
            <v-row justify="center" v-for="item in items" :key="item.text">
              <v-col cols="12" md="3">
                <v-subheader class="text-size">{{ item.text }}</v-subheader>
              </v-col>
              <v-col cols="12" md="9">
                <ValidationProvider
                  :name="item.model"
                  rules="required"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    :placeholder="item.text"
                    outlined
                    :type="item.type"
                    v-model="gift[item.model]"
                    hide-details
                  ></v-text-field>
                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="3">
                <v-subheader class="text-size">Loại quà tặng</v-subheader>
              </v-col>
              <v-col cols="12" md="9">
                <ValidationProvider
                  name="category"
                  rules="required"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-select
                    :items="listSelected"
                    placeholder="Loại quà tặng"
                    v-model="gift.category"
                    outlined
                    hide-details
                  ></v-select>

                  <span class="red--text">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <!-- <div class="my-avatar">
              <div v-if="imagesShow.length">
                <v-avatar
                  v-for="(image, i) in imagesShow"
                  class="profile ma-1"
                  color="grey"
                  size="164"
                  tile
                  :key="i"
                >
                  <v-img :src="image"></v-img>
                </v-avatar>
              </div>
            </div> -->
            <v-file-input
              show-size
              prepend-icon="mdi-camera"
              accept="image"
              full-width
              label="Thêm ảnh"
              v-model="gift.image"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row>
            <v-col offset="2">
              <v-btn
                color="primary"
                class="mx-auto"
                @click="submit"
                :disabled="invalid"
                >Cập nhật</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </div>
</template>

<script>
import giftService from "@/api/gift";

export default {
  components: {},

  data() {
    return {
      imagesShow: [],
      listSelected: ["Thẻ điện thoại", "Voucher"],
      gift: {
        name: "",
        value: "",
        category: "",
        quantity: "",
        image: null
      },
      items: [
        {
          text: "Tên quà tặng",
          model: "name",
          type: "text"
        },
        {
          text: "Giá trị",
          model: "value",
          type: "number"
        },
        {
          text: "Số lượng",
          model: "quantity",
          type: "number"
        }
      ]
    };
  },
  computed: {},
  methods: {
    async submit() {
      const { _id, name, value, category, quantity, image } = this.gift;
      const data = {
        _id,
        name,
        value,
        category,
        quantity,
        image
      };
      giftService
        .updateGift(data)
        .then(response => {
          this.$router.push({ name: "Gifts" });
          console.log(response);
          this.$swal({
            position: "center",
            icon: "success",
            title: "Chỉnh sửa quà tặng thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal("error: ", err.message, "error");
        });
    },
    async getData() {
      const giftId = this.$route.params.giftId;
      this.gift = await giftService.getGiftById(giftId);
      // let image = await gift.image.map(e => {
      //   return e.image;
      // });
      // this.gift = Object.assign({}, gift, {
      //   image
      // });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.text-size {
  font-size: 1rem;
}
.v-card {
  max-width: 70%;
}
</style>
