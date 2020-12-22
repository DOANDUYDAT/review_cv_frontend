<template>
  <v-data-table
    :headers="headers"
    :items="gifts"
    :sort-asc="[true]"
    :search="search"
    v-if="gifts"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Danh sách quà tặng</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          color="blue"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click.stop="goToEditProductPage(item)"
        color="blue"
        >mdi-pencil</v-icon
      >
      <v-icon small class="mr-2" @click.stop="deleteItem(item)" color="red"
        >mdi-trash-can-outline</v-icon
      >
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :src="`http://localhost:3030/uploads/${item.image}`"
        height="50px"
        width="50px"
      ></v-img>
    </template>
  </v-data-table>
</template>

<script>
/* eslint-disable no-unused-vars */
import giftService from "@/api/gift";

export default {
  data: () => ({
    headers: [
      {
        text: "Ảnh",
        value: "image",
        sortable: false,
        filterable: true
      },
      {
        text: "Tên quà tặng",
        value: "name",
        sortable: true
      },
      {
        text: "Giá trị",
        value: "value",
        sortable: false,
        filterable: false
      },
      {
        text: "Loại quà tặng",
        value: "category",
        sortable: false,
        filterable: false
      },
      {
        text: "Số lượng",
        value: "quantity",
        sortable: false,
        filterable: false
      },
      {
        text: "Hành động",
        align: "center",
        value: "action",
        sortable: false,
        filterable: false
      }
    ],
    gifts: null,
    search: ""
  }),

  computed: {},

  watch: {},
  created() {
    this.getData();
  },

  methods: {
    async ResizeImage(fileUrl) {
      let originImage = await (
        await fetch(`http://localhost:3030/uploads/${fileUrl}`)
      ).blob();
      let url = await this.getResizeImageUrl(originImage);
      return url;
    },
    getResizeImageUrl(originImage) {
      return new Promise((resolve, reject) => {
        let resizeImageUrl = null;
        // Create an image
        // Create a file reader
        let reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = async () => {
          // img.src = e.target.result;
          let img = await getLoadedImage(reader.result);
          let canvas = document.createElement("canvas");
          //let canvas = $("<canvas>", {"id":"testing"})[0];
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let MAX_WIDTH = 50;
          let MAX_HEIGHT = 50;
          let width = img.width;
          let height = img.height;

          function getLoadedImage(src) {
            return new Promise((resolve, reject) => {
              let img = new Image();
              img.src = src;
              img.onload = () => {
                resolve(img);
              };
              img.onerror = e => reject(e);
            });
          }

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          resizeImageUrl = canvas.toDataURL("image/png");
          resolve(resizeImageUrl);
        };
        reader.onerror = e => reject(e);
        reader.readAsDataURL(originImage);
      });
    },
    goToEditProductPage(gift) {
      this.$router.push({ path: `/admin/edit-gift/${gift._id}` });
    },
    async getData() {
      this.gifts = await giftService.getAllGifts();
      // for (let i = 0; i < this.gifts.length; i++) {
      //   let urlImage = this.gifts[i].image;
      //   this.gifts[i].image = await this.ResizeImage(urlImage);
      // }
    },
    async deleteItem(item) {
      const giftId = item._id;
      try {
        await giftService.deleteGift(giftId);
        this.$swal({
          title: "Xóa quà tặng thành công!",
          icon: "success"
        });
      } catch (err) {
        this.$swal({
          title: "Xóa quà tặng thất bại!",
          text: err.message,
          icon: "error"
        });
      }
      this.getData();
    }
  }
};
</script>
