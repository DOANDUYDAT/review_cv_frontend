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
      <v-img :src="item.image"></v-img>
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
    goToEditProductPage(gift) {
      this.$router.push({ path: `/admin/edit-gift/${gift._id}` });
    },
    async getData() {
      this.gifts = await giftService.getAllGifts();
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
