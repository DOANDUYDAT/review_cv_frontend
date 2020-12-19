<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <v-card flat>
        <v-toolbar color="primary" dark flat>
          <v-card-title>
            <span class="headline">Thêm quà tặng</span>
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
                >Submit</v-btn
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
      gift: {
        name: "",
        value: 0,
        category: "",
        quantity: 0,
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
          type: "text"
        },
        {
          text: "Loại quà tặng",
          model: "category",
          type: "text"
        },
        {
          text: "Số lượng",
          model: "quantity",
          type: "text"
        }
      ]
    };
  },
  computed: {},
  methods: {
    async submit() {
      const { name, value, category, quantity, image } = this.gift;
      const data = {
        name,
        value,
        category,
        quantity,
        image
      };
      giftService
        .createGift(data)
        .then(response => {
          console.log(response);
          this.$swal({
            position: "center",
            icon: "success",
            title: "Thêm quà tặng thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal("error: ", err.message, "error");
        });
    },
    // handleFileUpload(files) {
    //   this.gift.images = [];
    //   for (let i = 0; i < files.length; i++) {
    //     // this.gift.images.push({ image: files[i]});
    //     this.gift.images.push(files[i]);
    //     let reader = new FileReader();
    //     reader.onload = function() {
    //       this.imagesShow.push({ image: reader.result });
    //       // this.imagesShow.push(reader.result);
    //     }.bind(this);
    //     reader.readAsDataURL(files[i]);
    //   }
    // },
    resetInput() {
      this.gift.name = "";
      this.gift.value = 0;
      this.gift.category = "";
      this.gift.quantity = 0;
      this.gift.images = [];
    }
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
