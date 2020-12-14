<template>
  <v-data-table
    :headers="headers"
    :items="gifts"
    :sort-by="['id']"
    gift-key="id"
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
      <v-icon small class="mr-2" @click.stop="deleteItem(item)" color="red"
        >mdi-trash-can-outline</v-icon
      >
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
        text: "Gift Id",
        value: "id",
        sortable: false,
        filterable: true
      },
      {
        text: "Name",
        value: "name",
        sortable: true,
        filterable: false
      },
      {
        text: "Value",
        value: "value",
        sortable: false,
        filterable: false
      },
      {
        text: "Category",
        value: "category",
        sortable: false,
        filterable: false
      },
      {
        text: "Quatity",
        value: "quantity",
        sortable: false,
        filterable: false
      },
      {
        text: "Actions",
        align: "center",
        value: "action",
        sortable: false,
        filterable: false
      }
    ]
  }),

  computed: {},

  watch: {},
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const allGifts = await giftService.getAllGifts();
      this.gifts = allGifts;
    },
    async deleteItem(item) {
      const giftId = item.id;
      const confirmStatus = confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmStatus) {
        try {
          const isSuccess = await giftService.deleteGift(giftId);
          if (isSuccess) {
            await this.getData();
            this.$store.dispatch("alert/success", {
              message: "Delete Successfully!"
            });
          }
        } catch (error) {
          if (error.response) {
            this.$store.dispatch("alert/error", {
              message: error.response.data.detail
            });
          }
        }
      }
    }
  }
};
</script>
