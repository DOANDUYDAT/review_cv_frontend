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
            <v-file-input
              show-size
              prepend-icon="mdi-camera"
              accept="image/*"
              full-width
              label="Thêm ảnh"
              @change="handleFileUpload"
            ></v-file-input>
            <v-img width="150px" height="150px" :src="previewImage"></v-img>
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
                >Thêm</v-btn
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
      previewImage: null,
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
          this.resetInput();
        })
        .catch(err => {
          console.log(err);
          this.$swal("error: ", err.message, "error");
        });
    },
    handleFileUpload(image) {
      this.gift.image = image;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };

      if (image) {
        reader.readAsDataURL(image);
      }
    },
    resetInput() {
      this.gift.name = "";
      this.gift.value = "";
      this.gift.category = "";
      this.gift.quantity = "";
      this.gift.image = [];
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
